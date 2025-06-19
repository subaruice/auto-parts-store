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
    const [categories, setCategories] = useState([]);
    const [fetchItems, isLoading] = useFetching(async () => {
        if (id) {
            const resProductByCategory = await PostService.getCategoryByProduct(id);
            setItems(resProductByCategory.data);
        } else {
            const resItems = await PostService.getAllProducts();
            setItems(resItems.data);
        }
        const resCategories = await PostService.getAllCategories();
        setCategories(resCategories.data);
    });

    useEffect(() => {
        fetchItems();
    }, [id]);

    return (
        <div className="flex">
            <Sidebar categories={categories} />
            <div className="flex flex-col">
                <Header />
                {isLoading && <Skeleton />}
                <ProductList items={items} />
            </div>
        </div>
    );
};

export default Homepage;
