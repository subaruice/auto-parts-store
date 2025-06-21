import type { Item } from "../types/item";
import React from "react";
import Bucket from "../icons/button-bucket.svg?react";
import { Link } from "react-router";

interface ItemProps {
    items: Item[];
}

const ProductList: React.FC<ItemProps> = ({ items }) => {
    return (
        <div className="flex gap-4 px-4 justify-center flex-wrap">
            {items.map(({ name, in_stock, Price, product_code, pictures, brief_description, productID }) => (
                <Link to={`/products/${productID}`} key={productID} className="p-3 shadow-sm hover:shadow-xl shadow-black/30 bg-white w-[320px] border-[0.5px] border-black/30 h-auto flex flex-col ">
                    <div className="">
                        <img
                            src={`http://milotec.com.ua/pictures/${pictures[1]?.enlarged ||
                                pictures[1]?.thumbnail ||
                                pictures[1]?.filename ||
                                pictures[0]?.enlarged || pictures[0]?.thumbnail || pictures[0]?.filename}`}
                            alt="No picture"
                            className="w-full"
                        />
                    </div>
                    <h3 className="font-medium flex-1 text-[18px] my-2 text-black/90">{name}</h3>
                    <div className="text-[16px] text-black/70 mb-2" dangerouslySetInnerHTML={{ __html: brief_description }}></div>
                    <div className="text-[14px] text-black/60">Код товара: {product_code}</div>
                    <div className="flex justify-between mb-2 items-center">
                        <div className={`${in_stock === 1 ? "text-[#198754]" : "text-rose-800"}`}>
                            {in_stock === 1 ? "Есть в наличии" : "Нет в наличии"}
                        </div>
                        <div className="text-[22px]">{Price} ₴</div>
                    </div>
                    <div className="flex cursor-pointer justify-center gap-2 items-center hover:bg-red-500 transition-all bg-rose-700 ">
                        <Bucket className="w-7" />
                        <button className="py-3 text-[18px]  text-white font-medium ">В корзину</button>
                    </div>

                </Link>
            ))}
        </div>
    );
};
export default ProductList;
