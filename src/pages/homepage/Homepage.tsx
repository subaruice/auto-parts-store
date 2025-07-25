import Header from "../../components/header/Header";
import PostService from "../../API/PostService";
import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import { useFetching } from "../../hooks/useFetching";
import Skeleton from "../../components/UI/Skeleton";
import Sidebar from "../../components/sibebar/Sidebar";
import { useLocation, useParams } from "react-router";
import { Outlet } from "react-router";

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const { categoryID, productID, cat } = useParams();
    const [product, setProduct] = useState<Item>({});
    const [hasMore, setHasMore] = useState(true);
    const limit = 20;
    const offset = useRef(0);
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string>("");
    const [categories, setCategories] = useState([]);
    const observerRef = useRef(null);
    const initialLoad = useRef(true);

    const [fetchItems, isLoading, onError] = useFetching(async () => {
        setSearch("");
        console.log("fetch");
        if (!categoryID && !productID && location.pathname !== "/") return;

        if (initialLoad.current) {
            setItems([]);
            offset.current = 0;
            setHasMore(true);
        }

        if (categoryID) {
            const resProductByCategory = await PostService.getCategoryByProduct(categoryID, limit, offset.current);
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
            const resItems = await PostService.getAllSaleProducts(limit, offset.current);
            setItems((prev) => (initialLoad.current ? resItems.data : [...prev, ...resItems.data]));
            offset.current += limit;
            if (offset.current >= resItems.headers["x-total-count"]) {
                setHasMore(false);
            }
            initialLoad.current = false;
        } else if (location.pathname === "/catalog") {
            const resItems = await PostService.getAllSaleProducts(limit, offset.current);
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
        const key = search.toLowerCase();
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
    }, [search, items]);
    const contextValue = useMemo(() => ({ product, filteredItems, categories }), [product, filteredItems, categories]);

    return (
        <div ref={toTop} className="flex">
            <Sidebar categoryID={cat} categories={categories} />
            <div className="flex flex-col w-full h-auto">
                <Header search={search} setSearch={setSearch} />
                {isLoading ? (
                    <Skeleton />
                ) : onError ? (
                    <div className="text-gray-700 mt-10 text-[30px] text-center">Нет товаров в данной категории</div>
                ) : (
                    <Outlet context={contextValue} />
                )}
                <div className="h-[1px]" ref={observerRef}></div>
            </div>
        </div>
    );
};

export default Homepage;
