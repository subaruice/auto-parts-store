import type { Item } from "../types/item";
import { useLocation, useOutletContext } from "react-router";
import { memo } from "react";
import ItemFromProductList from "./ItemFromProductList";
import SliderHomepage from "./UI/SliderHomepage";
import CommonAdvantages from "./productAdvantages/CommonAdvantages";

interface ItemProps {
    filteredItems: Item[];
}

const ProductList = memo(() => {
    const { filteredItems } = useOutletContext<ItemProps>();
    const location = useLocation();
    console.log(filteredItems.length);

    return (
        <div className="flex flex-col gap-4 px-4 py-4">
            
            {location.pathname === "/" && (
                <div>
                    <SliderHomepage />
                    <CommonAdvantages />
                    <div className="px-2 mt-4 text-center text-black/80">
                        Мы работаем как с новыми, так и с уже известными моделями Škoda Auto
                        <br />
                        <span className=" text-[20px] font-medium ">Товары находящиеся сейчас по скидке:</span>
                    </div>
                </div>
            )}

            <div className="flex gap-4 justify-center flex-wrap ">
                {filteredItems && filteredItems.map((p) => <ItemFromProductList key={p.productID} item={p} />)}
            </div>
        </div>
    );
});
export default ProductList;
