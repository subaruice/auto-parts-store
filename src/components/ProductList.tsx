import type { Item } from "../types/item";
import React from "react";

interface ItemProps {
    items: Item[];
}

const ProductList: React.FC<ItemProps> = ({ items }) => {
    return (
        <div className="flex gap-3 justify-center flex-wrap">
            {items.map(({name, in_stock, Price, product_code}) => 
                <div className="w-[300px]  border-[0.5px] rounded-[5px] border-black/30 h-auto flex flex-col ">
                    <h3 className="font-medium text-black/90">{name}</h3>
                    <div className="text-[14px]">Код товара: {product_code}</div>
                    <div className="flex justify-between">
                        <div className={`${in_stock === 1 ? 'text-green-700' : 'text-red-800'}`}>{in_stock === 1 ? 'Есть в наличии' : 'Нет в наличии'}</div>
                        <div className="text-[20px]">{Price} ₴</div>
                    </div>
                    <div></div>
                </div>
            )}
            <div className="border-0.5 border-black/30"></div>
        </div>
    );
};
export default ProductList;
