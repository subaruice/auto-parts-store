import Header from "../../components/header/Header";
import PostService from "../../API/PostService";
import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import { useFetching } from "../../hooks/useFetching";
import Skeleton from "../../components/UI/Skeleton";
import Sidebar from "../../components/sibebar/Sidebar";
import { useLocation, useParams } from "react-router";
import { Outlet } from "react-router";
import HeaderMobile from "../../components/header/HeaderMobile";

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const { categoryID, productID, cat } = useParams();
    const [product, setProduct] = useState<Item>({});
    const [hasMore, setHasMore] = useState(true);
    const limit = 2000;
    const offset = useRef(0);
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string>("");
    const [debounceSearch, setDebounceSearch] = useState<string>(search);
    const [categories, setCategories] = useState([]);
    const observerRef = useRef(null);
    const initialLoad = useRef(true);
    const isMobile = window.innerWidth < 1024;

    const [fetchItems, isLoading, onError] = useFetching(async () => {
        if (location.pathname !== "/catalog") {
            setSearch("");
        }
        console.log("fetch");
        if (!categoryID && !productID && location.pathname !== "/" && location.pathname !== '/catalog') return;

        if (initialLoad.current) {
            setItems([]);
            offset.current = 0;
            setHasMore(true);
        }

        if (categoryID) {
            const resProductByCategory = await PostService.getCategoryByProduct(Number(categoryID), limit, offset.current);
            setItems((prev) =>
                initialLoad.current ? resProductByCategory.data : [...prev, ...resProductByCategory.data]
            );
            offset.current += limit;
            if (offset.current >= resProductByCategory.headers["x-total-count"]) {
                setHasMore(false);
            }
            initialLoad.current = false;
        } else if (productID) {
            const resProduct = await PostService.getProductByID(productID);
            setProduct(resProduct.data);
            return;
        } else if (location.pathname === "/") {
            const resItems = await PostService.getAllSaleProducts(20, offset.current);
            setItems((prev) => (initialLoad.current ? resItems.data : [...prev, ...resItems.data]));
            offset.current += 20;
            if (offset.current >= resItems.headers["x-total-count"]) {
                setHasMore(false);
            }
            initialLoad.current = false;
        } else if (location.pathname === "/catalog") {
            const resItems = await PostService.getAllProducts(limit, offset.current);
            setItems((prev) => (initialLoad.current ? resItems.data : [...prev, ...resItems.data]));
            offset.current += limit;
            if (offset.current >= resItems.headers["x-total-count"]) {
                setHasMore(false);
            }
            initialLoad.current = false;
        }
    });

    const location = useLocation();
    const toTop = useRef<HTMLDivElement>(null);
    const [fetchCategories] = useFetching(async () => {
        const resCategories = await PostService.getAllCategories();
        setCategories(resCategories.data);
    });
    const scrollToTop = () => {
        toTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceSearch(search)
        }, 1000);

        return () => clearTimeout(timerId)
    }, [search])
    
    useEffect(() => {
        console.log("useeffect initial");
        initialLoad.current = true;
        setHasMore(true);
        fetchItems();
        scrollToTop();
    }, [categoryID, productID, location.pathname]);

    useEffect(() => {
        if (!observerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore && !isLoading && !initialLoad.current && !onError) {
                console.log("useeffect observer");
                fetchItems();
            }
        });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, isLoading]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredItems = useMemo(() => {
        const key = debounceSearch.toLowerCase();
        if (location.pathname === "/") {
            return items.filter((item) => {
                return (
                    item.list_price !== 0 &&
                    (item.name?.toLowerCase().includes(key) ||
                        item.description?.toLowerCase().includes(key) ||
                        item.brief_description?.toLowerCase().includes(key) ||
                        item.product_code?.includes(key))
                );
            });
        } else {
            return items.filter((item) => {
                return (
                    item.name?.toLowerCase().includes(key) ||
                    item.description?.toLowerCase().includes(key) ||
                    item.brief_description?.toLowerCase().includes(key) ||
                    item.product_code?.includes(key)
                );
            });
        }
    }, [debounceSearch, items]);
    const contextValue = useMemo(
        () => ({ product, filteredItems, categories, isLoading }),
        [product, filteredItems, categories, isLoading]
    );

    return (
        <div ref={toTop} className="flex">
            {!isMobile && <Sidebar categoryID={cat} categories={categories} />}
            <div className="flex flex-col w-full h-auto">
                {isMobile ? (
                    <HeaderMobile categoryID={cat} categories={categories} />
                ) : (
                    <Header search={search} setSearch={setSearch} />
                )}
                {isLoading && location.pathname !== "/" ? (
                    <Skeleton />
                ) : onError ? (
                    <div className="text-gray-700 mt-10 text-[30px] text-center">Нет товаров в данной категории</div>
                ) : (
                    <Outlet context={contextValue} />
                )}
                {(location.pathname === "/" || location.pathname === '/catalog') && <div className="h-[1px]" ref={observerRef}></div>}
            </div>
        </div>
    );
};

export default Homepage;
