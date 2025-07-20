import Bucket from "../icons/button-bucket.svg?react";
import { Link } from "react-router";
import { memo, useState } from "react";
import AddedProductToBucket from "./UI/AddedProductToBucket";
import type { Item } from "../types/item";

const ItemFromProductList = memo(({ item }: any) => {
    const [showAddBucketMessage, setShowAddBucketMessage] = useState(false);

    const sanitize = (html: string) =>
        html
            .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
            .replace(/<link[^>]*>/gi, "")
            .replace(/<img[^>]*fckeditor[^>]*>/gi, "")
            .replace(/<img[^>]*spacer\.gif[^>]*>/gi, "")
            .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(/<p>(?:\s|&nbsp;)*<\/p>/gi, "")
            .replace(/\s?(class|style)="[^"]*"/gi, "")
            .trim();

    const addProduct = (product: Item, e: any) => {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem("products") ?? "[]");
        let existing = false;
        const updated = stored.map((p: Item) =>
            p.productID === product.productID
                ? ((existing = true), { ...p, quantity: p.quantity + 1 })
                : { ...p, quantity: p.quantity }
        );
        if (!existing) {
            updated.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("products", JSON.stringify(updated));
        window.dispatchEvent(new Event("customEvent"));
        setShowAddBucketMessage(true);
        setTimeout(() => {
            setShowAddBucketMessage(false);
        }, 2500);
    };

    const sale = Math.floor((item.list_price - item.Price) / item.list_price * 100)

    return (
        <Link
            to={`/category/${item.categoryID}/products/${item.productID}`}
            key={item.productID}
            className="p-3 shadow-sm relative hover:shadow-xl shadow-black/30 bg-white w-[320px] border-[0.5px] border-black/30 h-auto flex flex-col "
        >
            {item.list_price > 0 && (
                <div className="bg-red-600 absolute text-white text-[18px] -top-[10px] px-4 py-1 right-3">-{sale}%</div>
            )}
            <div className="">
                <img
                    src={`http://milotec.com.ua/pictures/${item.pictures[1]?.enlarged ||
                        item.pictures[1]?.thumbnail ||
                        item.pictures[1]?.filename ||
                        item.pictures[0]?.enlarged ||
                        item.pictures[0]?.thumbnail ||
                        item.pictures[0]?.filename}`}
                    alt="No picture"
                    className="w-full"
                />
            </div>
            <h3 className="font-medium flex-1 text-[18px] my-2 text-black/90">{item.name}</h3>
            <div
                className="text-[16px] text-black/70 mb-2"
                dangerouslySetInnerHTML={{ __html: sanitize(item.brief_description) }}
            ></div>
            <div className="text-[14px] text-black/60">Код товара: {item.product_code}</div>
            <div className="flex justify-between mb-2 items-center">
                <div className={`${item.in_stock === 1 ? "text-[#198754]" : "text-rose-800"}`}>
                    {item.in_stock === 1 ? "Есть в наличии" : "Нет в наличии"}
                </div>
                <div className="text-[22px] relative">{item.Price} ₴
                    <div className="absolute text-[14px] -top-[50%] text-black/60 line-through right-0">{item.list_price} ₴</div>
                </div>
            </div>

            <div
                onClick={(e) => addProduct(item, e)}
                className={`${
                    item.in_stock === 0
                        ? "pointer-events-none bg-[#94c29f]"
                        : "active:bg-green-950 cursor-pointer hover:bg-[#468153] bg-[#3fa357]"
                } flex  justify-center gap-2 items-center  transition-all `}
            >
                <Bucket className="w-7" />
                <button className="py-3 text-[18px]  text-white font-medium ">В корзину</button>
            </div>
            {showAddBucketMessage && <AddedProductToBucket show={showAddBucketMessage} />}
        </Link>
    );
});

export default ItemFromProductList;
