import Header from '../../components/header/Header';
import PostService from '../../API/PostService';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList';
import { useFetching } from './../../hooks/useFetching';
import Skeleton from '../../components/UI/Skeleton';

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [fetchItems, isLoading, onError] = useFetching(async () => {
        const res = await PostService.getAllProducts()
            setItems(res.data);
    })

    useEffect(() => {
        fetchItems();
    }, [])

    return (
       <div className="flex flex-col">
           <Header/>
           {isLoading && (
            <Skeleton/>
           )}
           <ProductList items={items} />
       </div>
    );
};

export default Homepage ;