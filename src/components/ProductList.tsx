import type { Item } from "../types/item";
import { ArrowUpDown } from "lucide-react";
import { useLocation, useOutletContext, useParams } from "react-router";
import { memo, useState } from "react";
import ItemFromProductList from "./ItemFromProductList";
import SliderHomepage from "./UI/SliderHomepage";
import CommonAdvantages from "./productAdvantages/CommonAdvantages";

interface ItemProps {
    filteredItems: Item[];
    categories: any;
}

type Option = {
    value: string;
    label: string;
};
const options: Option[] = [
    { value: "default", label: "По умолчанию" },
    { value: "price_low_high", label: "По возрастанию цены" },
    { value: "price_high_low", label: "По убыванию цены" },
    { value: "price_sale", label: "По скидке" },
];

const ProductList = memo(() => {
    const { filteredItems, categories } = useOutletContext<ItemProps>();
    const [currentOption, setCurrentOption] = useState<Option>(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { categoryID } = useParams();

    const toggleSort = () => {
        setIsOpen(!isOpen);
    };

    const category = categories.find((cat: any) => {
        if (cat.categoryID === Number(categoryID)) {
            return true;
        }
        return cat.subcategories.some((sub: any) => sub.categoryID === Number(categoryID));
    });

    return (
        <div className="flex flex-col gap-4 px-4 py-4">
            {category && (
                <div className="rounded-lg relative gap-2 items-center flex px-3 py-1 bg-white justify-between w-full">
                    <div className="grow font-medium text-[22px] text-black/70">{category.name}</div>
                    <ArrowUpDown
                        onClick={toggleSort}
                        className={`${isOpen &&
                            "bg-black/10 stroke-white"} rounded cursor-pointer hover:stroke-[#707070]`}
                        color="#333333"
                    />
                    <div className="text-black/50">{currentOption.label}</div>
                    {isOpen && (
                        <div className="flex px-3 py-2 bg-white gap-3 text-black/80  flex-col items-left rounded-lg justify-center absolute right-0 top-0 z-50 ">
                            {options.map((option) => (
                                <div
                                    onClick={() => {
                                        setCurrentOption(option);
                                        toggleSort();
                                    }}
                                    key={option.value}
                                    className="hover:text-black cursor-pointer"
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {location.pathname === "/" && (
                <div>
                    <SliderHomepage />
                    <CommonAdvantages />
                    <div className="px-2 my-4 text-center text-black/80">
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
