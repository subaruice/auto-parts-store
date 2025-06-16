import type { Item } from "../types/item";
import React from "react";

interface ItemProps {
    items: Item[];
}

const ProductList: React.FC<ItemProps> = ({ items }) => {
    return (
        <div className="flex gap-3 justify-center flex-wrap">
            {items.map(({name, in_stock, Price, product_code, pictures}) => 
                <div className="p-3  bg-white w-[300px] border-[0.5px] rounded-[10px] border-black/30 h-auto flex flex-col ">
                    <div>
                        <img src={"http://milotec.com.ua/pictures/" + pictures[0].enlarged} alt="" />
                    </div>
                    <h3 className="font-medium text-black/90">{name}</h3>
                    <div className="text-[14px] text-black/60">Код товара: {product_code}</div>
                    <div className="flex flex-1 justify-between">
                        <div className={`${in_stock === 1 ? 'text-[#198754]' : 'text-rose-800'}`}>{in_stock === 1 ? 'Есть в наличии' : 'Нет в наличии'}</div>
                        <div className="text-[20px]">{Price} ₴</div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="py-3 rounded-[7px] text-[18px] w-full text-white font-medium bg-rose-700">В корзину</button>
                    </div>
                    <div></div>
                </div>
            )}
            <div className="border-0.5 border-black/30"></div>
        </div>
    );
};
export default ProductList;
