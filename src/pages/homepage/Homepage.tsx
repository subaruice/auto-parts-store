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
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string>("");
    const [categories, setCategories] = useState([]);
    const [fetchItems, isLoading, onError] = useFetching(async () => {
        setSearch('')
        if (categoryID) {
            const resProductByCategory = await PostService.getCategoryByProduct(categoryID);
            setItems(resProductByCategory.data);
            return
        } else if (productID) {
            const resProduct = await PostService.getProductByID(productID);
            setProduct(resProduct.data);
            return
        } else if (location.pathname === "/") {
            const resItems = await PostService.getAllProducts();
            setItems(resItems.data);
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
        if (categories.length === 0) {
            fetchCategories();
        }
        scrollToTop();
        fetchItems();
    }, [categoryID, productID, location.pathname]);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const key = search.toLowerCase();
            return (
                item.name?.toLowerCase().includes(key) ||
                item.description?.toLowerCase().includes(key) ||
                item.brief_description?.toLowerCase().includes(key) ||
                item.product_code?.includes(key)
            );
        });
    }, [search, items]);

    return (
        <div ref={toTop} className="flex">
            <Sidebar categoryID={cat} categories={categories} />
            <div className="flex flex-col w-full h-auto">
                <Header search={search} setSearch={setSearch} />
                {isLoading && <Skeleton />}
                {onError ? (
                    <div className="text-gray-700 mt-10 text-[30px] text-center">Нет товаров в данной категории</div>
                ) : (
                    <Outlet context={{ product, filteredItems }} />
                )}
            </div>
        </div>
    );
};

export default Homepage;
