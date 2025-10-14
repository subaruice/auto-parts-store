import React, { memo, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import type { Product } from "../../types/product";
import type { AppDispatch, RootState } from "../../app/store";
import { changeByCategoryProduct, fetchCategories, fetchProducts } from "../../features/adminSlice";
import type { Category } from "../../types/category";
import { ChevronDown, ChevronUp } from "lucide-react";
import Skeleton from "../../components/UI/Skeleton";
import PostService from "./../../API/PostService";
import ProductItem from "../components/ProductItem";
import AddProduct from "../components/AddProduct";

const Products: React.FC = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector<RootState, Product[]>((state) => state.admin.products, shallowEqual);
    const categories = useSelector<RootState, Category[]>((state) => state.admin.categories, shallowEqual);
    const loading = useSelector<RootState, boolean>((state) => state.admin.loading);
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [selectedCat, setIsSelectedCat] = useState("Все");
    const [categoryId, setCategoryId] = useState<number>();
    const [selectedProductId, setSelectedProductId] = useState<number>();
    const [showAddComponent, setShowAddComponent] = useState(false);
    const fetchCategory = async (id: number) => {
        try {
            const res = await PostService.getCategoryByProduct(id, 999);
            dispatch(changeByCategoryProduct(res.data));
        } catch (err) {
            console.log(err);
        }
    };

    console.log("render");

    const product = useMemo(() => {
        return products.find((p) => p.productID === selectedProductId);
    }, [selectedProductId]);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId]);

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between text-white items-center mb-4">
                <h2 className="text-xl font-bold">Продукты</h2>
                {showAddComponent ? (
                    <AddProduct setModal={setShowAddComponent} />
                ) : (
                    <button
                        onClick={() => setShowAddComponent(true)}
                        className="self-end bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        + Добавить продукт
                    </button>
                )}
            </div>
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    <div className="w-full relative pt-0 mb-4">
                        <div className="inline-flex gap-2 text-white text-[18px] items-center">
                            <p>Категория: </p>
                            <div
                                onClick={() => setIsCatOpen((prev) => !prev)}
                                className="inline-flex cursor-pointer hover:bg-blue-500 px-2 border text-[16px] py-0.5 text-white border-white  rounded-lg"
                            >
                                <p className="">{selectedCat}</p>
                                {isCatOpen ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>
                        {isCatOpen && (
                            <div className="cursor-pointer flex-col overflow-y-auto flex z-50 border-gray-400 border-2 bg-blue-50 p-2 absolute rounded-lg">
                                {categories.map((cat: Category) => (
                                    <div
                                        key={cat.categoryID}
                                        onClick={() => {
                                            setCategoryId(cat.categoryID);
                                            setIsCatOpen(false);
                                            setIsSelectedCat(cat.name);
                                        }}
                                        className="py-1.5 px-1 hover:bg-blue-500 hover:text-white"
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((p) => (
                            <div
                                onClick={() => {
                                    if (p.productID === selectedProductId) {
                                        setSelectedProductId(undefined);
                                    } else {
                                        setSelectedProductId(p.productID);
                                    }
                                }}
                                key={p.productID}
                                className="cursor-pointer hover:outline-4 hover:outline-blue-500 p-2 rounded-xl bg-white"
                            >
                                {p.productID === selectedProductId ? (
                                    <ProductItem product={product} />
                                ) : (
                                    <div className="flex gap-5">
                                        <img
                                            src={`https://milotec.com.ua/pictures/${p.pictures[1]?.enlarged || p.pictures[1]?.thumbnail || p.pictures[1]?.filename || p.pictures[0].enlarged || p.pictures[0].thumbnail || p.pictures[0].filename}`}
                                            alt="no image"
                                            className="w-25 rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-bold">{p.name}</h3>
                                            <p>
                                                Код: <span className="text-black/60">{p.product_code}</span>
                                            </p>
                                            <p>
                                                Цена: <span className="font-medium">{p.Price} ₴</span>
                                            </p>
                                            <p>
                                                В наличии:{" "}
                                                <span
                                                    className={`${p.in_stock > 0 ? "text-green-600" : "text-red-700"} font-medium `}
                                                >
                                                    {p.in_stock}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});

export default Products;
