import type { Item } from "../types/item";
import { useOutletContext } from "react-router";
import { memo } from "react";
import ItemFromProductList from "./ItemFromProductList";

interface ItemProps {
    filteredItems: Item[];
}

const ProductList = memo(() => {
    const { filteredItems } = useOutletContext<ItemProps>();
    console.log(filteredItems);
    
    return (
        <div className="flex gap-4 px-4 justify-center flex-wrap ">
            {filteredItems &&
                filteredItems.map((p) => (
                    <ItemFromProductList key={p.productID} item={p}/>
                ))}
        </div>
    );
});
export default ProductList;
