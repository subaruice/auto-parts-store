import Header from '../../components/header/Header';
import PostService from '../../API/PostService';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList';

interface Item {
    [key: string]: any;
}

const Homepage = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await PostService.getAllProducts();
            setItems(res.data);
        }
        fetchItems();
    }, [])

    return (
       <div className="flex flex-col">
           <Header/>
           <ProductList items={items} />
       </div>
    );
};

export default Homepage ;