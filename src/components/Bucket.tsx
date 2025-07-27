import { memo, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";

const Bucket = memo(() => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products") ?? "[]"));
    const [finalPrice, setFinalPrice] = useState(0);

    const sumUpPrices = () => {
        const total = products.reduce(
            (acc: number, product: any) =>
                product.quantity == 1 ? acc + product.Price : acc + product.Price * product.quantity,
            0
        );
        setFinalPrice(total);
    };

    const incQuantity = (id: string) => {
        const updated = products.map((p: any) => (p.productID === id ? { ...p, quantity: p.quantity + 1 } : p));
        setProducts([...updated]);
        localStorage.setItem("products", JSON.stringify(updated));
    };

    const decQuantity = (id: string) => {
        const updated = products.map((p: any) =>
            p.productID === id ? { ...p, quantity: p.quantity === 1 ? 1 : p.quantity - 1 } : p
        );
        localStorage.setItem("products", JSON.stringify(updated));
        setProducts([...updated]);
    };

    const clearProducts = (id: string) => {
        const updated = products.filter((p: any) => p.productID !== id);
        localStorage.setItem("products", JSON.stringify(updated));
        setProducts([...updated]);
        window.dispatchEvent(new Event("customEvent"));
    };

    useEffect(() => {
        sumUpPrices();
    }, [products]);
    return (
        <div className="p-4 w-full h-full">
            <div className="rounded-[10px] p-4 bg-white w-full h-full">
                {products.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            {products.map((product: any) => (
                                <div key={product.productID} className="flex items-center">
                                    <div className="h-20 w-30 mr-4">
                                        <img
                                            className="h-20 object-contain"
                                            src={`http://milotec.com.ua/pictures/${product.pictures[0]?.thumbnail ||
                                                product.pictures[0]?.filename ||
                                                product.pictures[0]?.enlarged}`}
                                            alt="no picture"
                                        />
                                    </div>
                                    <Link
                                        to={`/category/${product.categoryID}/products/${product.productID}`}
                                        className="flex-1 pr-4 font-medium text-black/80 text-[17px]"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="flex gap-2 w-25">
                                        <button
                                            onClick={() => decQuantity(product.productID)}
                                            className="text-[26px] hover:text-black/65 text-black/50"
                                        >
                                            -
                                        </button>
                                        <p className="border border-black/30 rounded-md text-black/70 py-2 px-5">
                                            {product.quantity}
                                        </p>
                                        <button
                                            onClick={() => incQuantity(product.productID)}
                                            className="text-[26px] hover:text-black/65 text-black/50"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="w-25 text-center text-[18px] ">{product.Price}₴</div>
                                    <X
                                        onClick={() => clearProducts(product.productID)}
                                        className="cursor-pointer hover:stroke-red-700"
                                        color="#fd3535"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <div className="flex  bg-blue-50 rounded border justify-between gap-2 items-center py-5 px-4 border-[#328044] mt-5">
                                <div className="text-center text-[30px] px-3 flex-1 text-black/80">{finalPrice}₴</div>
                                <button className="self-end font-medium text-[18px] text-white rounded-xl active:bg-green-950 hover:bg-[#468153] transition-all py-4 px-6 bg-[#3fa357] w-50">
                                    Оформить заказ
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-[25px] text-black/70">Пусто</div>
                )}
            </div>
        </div>
    );
});

export default Bucket;
