import type { Item } from "../types/item";
import Bucket from "../icons/button-bucket.svg?react";
import { Link, useOutletContext } from "react-router";
import { memo } from "react";

interface ItemProps {
    filteredItems: Item[];
}

const ProductList = memo(() => {
    const {filteredItems} = useOutletContext<ItemProps>()
    console.log(filteredItems);
    
    const addProduct = (product:Item, e:any) => {
        e.stopPropagation()
        const stored = JSON.parse(localStorage.getItem('products') ?? '[]')
        const updated = stored.map((p:Item) => 
            p.productID === product.productID ? {...p, quantity: p.quantity + 1} : {...p, quantity: 1}     
        )
        localStorage.setItem('products', JSON.stringify(updated))
    }

    return (
        <div className="flex gap-4 px-4 justify-center flex-wrap ">
            {filteredItems && filteredItems.map((p) => (
                <Link to={`/category/${p.categoryID}/products/${p.productID}`} key={p.productID} className="p-3 shadow-sm hover:shadow-xl shadow-black/30 bg-white w-[320px] border-[0.5px] border-black/30 h-auto flex flex-col ">
                    <div className="">
                        <img
                            src={`http://milotec.com.ua/pictures/${p.pictures[1]?.enlarged ||
                                p.pictures[1]?.thumbnail ||
                                p.pictures[1]?.filename ||
                                p.pictures[0]?.enlarged || p.pictures[0]?.thumbnail || p.pictures[0]?.filename}`}
                            alt="No picture"
                            className="w-full"
                        />
                    </div>
                    <h3 className="font-medium flex-1 text-[18px] my-2 text-black/90">{p.name}</h3>
                    <div className="text-[16px] text-black/70 mb-2" dangerouslySetInnerHTML={{ __html: p.brief_description }}></div>
                    <div className="text-[14px] text-black/60">Код товара: {p.product_code}</div>
                    <div className="flex justify-between mb-2 items-center">
                        <div className={`${p.in_stock === 1 ? "text-[#198754]" : "text-rose-800"}`}>
                            {p.in_stock === 1 ? "Есть в наличии" : "Нет в наличии"}
                        </div>
                        <div className="text-[22px]">{p.Price} ₴</div>
                    </div>
                    
                    <div className="flex cursor-pointer justify-center gap-2 items-center hover:bg-[#468153] transition-all bg-[#3fa357] ">
                        <Bucket className="w-7" />
                        <button onClick={(e) => addProduct(p, e)} className="py-3 text-[18px]  text-white font-medium ">В корзину</button>
                    </div>

                </Link>
            ))}
        </div>
    );
});
export default ProductList;
