import Header from "../../components/header/Header";
import PostService from "../../API/PostService";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import { useFetching } from "../../hooks/useFetching";
import Skeleton from "../../components/UI/Skeleton";
import Sidebar from "../../components/sibebar/Sidebar";
import { useParams } from "react-router";

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const { id } = useParams();
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string | number>();
    const [categories, setCategories] = useState([]);
    const [fetchItems, isLoading, onError] = useFetching(async () => {
        if (id) {
            const resProductByCategory = await PostService.getCategoryByProduct(id);
            setItems(resProductByCategory.data);
        } else {
            const resItems = await PostService.getAllProducts();
            setItems(resItems.data);
        }
    });

    const [fetchCategories] = useFetching(async () => {
        const resCategories = await PostService.getAllCategories();
        setCategories(resCategories.data);
    });

    useEffect(() => {
        fetchItems();
    }, [id]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const filtredItems = () => {
        const filtred = items.filter((item) => {
            if (typeof search === "string") {
                const key = search.toLowerCase();
                item.name?.toLowerCase().include(key) ||
                    item.description?.toLowerCase().include(key) ||
                    item.brief_description?.toLowerCase().include(key);
            } else if (typeof search === "number") {
                item.product_code?.include(search);
            }
        });
        return filtred;
    };

    return (
        <div className="flex">
            <Sidebar categories={categories} />
            <div className="flex flex-col w-full">
                <Header search={search} setSearch={setSearch} />
                {isLoading && <Skeleton />}
                {onError ? (
                    <div className="text-gray-700 mt-10 text-[30px] text-center">Нет товаров в данной категории!</div>
                ) : (
                    <ProductList items={filtredItems} />
                )}
            </div>
        </div>
    );
};

export default Homepage;
