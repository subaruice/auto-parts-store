import Header from "../../components/header/Header";
import PostService from "../../API/PostService";
import { useEffect, useMemo, useState } from "react";
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
    const [search, setSearch] = useState<string>('');
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

    const filteredItems = useMemo(() => {
  return items.filter((item) => {
      const key = search.toLowerCase();
      return (
        item.name?.toLowerCase().includes(key) ||
        item.description?.toLowerCase().includes(key) ||
        item.brief_description?.toLowerCase().includes(key) ||
        item.product_code?.includes(key)
      ) 
    })
}, [search, items]);

    return (
        <div className="flex">
            <Sidebar categories={categories} />
            <div className="flex flex-col w-full">
                <Header search={search} setSearch={setSearch} />
                {isLoading && <Skeleton />}
                {onError ? (
                    <div className="text-gray-700 mt-10 text-[30px] text-center">Нет товаров в данной категории!</div>
                ) : (
                    <ProductList items={filteredItems } />
                )}
            </div>
        </div>
    );
};

export default Homepage;
