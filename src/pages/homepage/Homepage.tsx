import Header from "../../components/header/Header";
import PostService from "../../API/PostService";
import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import { useFetching } from "./../../hooks/useFetching";
import Skeleton from "../../components/UI/Skeleton";
import Sidebar from "../../components/sibebar/Sidebar";

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState([])
    const [fetchItems, isLoading, onError] = useFetching(async () => {
        const resItems = await PostService.getAllProducts();
        const resCategories = await PostService.getAllCategories();
        setItems(resItems.data);
        setCategories(resCategories.data);
    });

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="flex">
            <Sidebar categories={categories}/>
            <div className="flex flex-col">
                <Header />
                {isLoading && <Skeleton />}
                <ProductList items={items} />
            </div>
        </div>
    );
};

export default Homepage;
