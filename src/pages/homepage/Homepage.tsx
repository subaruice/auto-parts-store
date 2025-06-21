import Header from "../../components/header/Header";
import PostService from "../../API/PostService";
import { useEffect, useMemo, useState } from "react";
import ProductList from "../../components/ProductList";
import { useFetching } from "../../hooks/useFetching";
import Skeleton from "../../components/UI/Skeleton";
import Sidebar from "../../components/sibebar/Sidebar";
import { useParams } from "react-router";
import ProductItem from "../../components/productItem/ProductItem";

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const { categoryID, productID } = useParams();
    const [product, setProduct] = useState<Item>({});
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string>("");
    const [categories, setCategories] = useState([]);
    const [fetchItems, isLoading, onError] = useFetching(async () => {
        if (categoryID) {
            setSearch('')
            const resProductByCategory = await PostService.getCategoryByProduct(categoryID);
            setItems(resProductByCategory.data);
            setProduct({});
        } else if (productID) {
            setSearch('')
            const resProduct = await PostService.getProductByID(productID);
            setProduct(resProduct.data);
        } else {
            setSearch('')
            const resItems = await PostService.getAllProducts();
            setItems(resItems.data);
            setProduct({});
        }
    });

    const [fetchCategories] = useFetching(async () => {
        const resCategories = await PostService.getAllCategories();
        setCategories(resCategories.data);
    });

    useEffect(() => {
        fetchItems();
    }, [categoryID, productID]);

    useEffect(() => {
        fetchCategories();
    }, []);

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
        <div className="flex">
            <Sidebar categories={categories} />
            <div className="flex flex-col w-full h-auto">
                <Header search={search} setSearch={setSearch} />
                {isLoading && <Skeleton />}
                {onError ? (
                    <div className="text-gray-700 mt-10 text-[30px] text-center">Нет товаров в данной категории</div>
                ) : !productID ? (
                    <ProductList items={filteredItems} />
                ) : (
                    <ProductItem product={product} />
                )}
            </div>
        </div>
    );
};

export default Homepage;
