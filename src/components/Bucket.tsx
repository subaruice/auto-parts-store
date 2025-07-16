import { useEffect, useState } from "react";

const Bucket = () => {
    const products = JSON.parse(localStorage.getItem("products") ?? "[]");
    const [finalPrice, setFinalPrice] = useState(0);

    const sumUpPrices = () => {
        const total = products.reduce((acc:any, product:any) => acc + product.Price, 0)
        setFinalPrice(total)        
    }
    useEffect(() => {
        sumUpPrices();
    },[])
    return (
        <div className="p-4 w-full h-full">
            <div className="rounded-[10px] p-4 bg-white w-full h-full">
                <div className="flex flex-col gap-4">
                    {products.map((product: any) => (
                        <div className="flex items-center">
                            <div className="h-20 w-30 mr-4">
                                <img
                                    className="h-20 object-contain"
                                    src={`http://milotec.com.ua/pictures/${product.pictures[0].thumbnail ||
                                        product.pictures[0].filename ||
                                        product.pictures[0].enlarged}`}
                                    alt="no picture"
                                />
                            </div>
                            <div className="flex-1 pr-4 font-medium text-black/80 text-[17px]">{product.name}</div>
                            <div className="flex gap-2 w-25">
                                <button className="text-[26px] text-black/50">-</button>
                                <p className="border border-black/30 rounded-md text-black/70 py-2 px-5">{0}</p>
                                <button className="text-[26px] text-black/50">+</button>
                            </div>
                            <div className="w-25 text-center text-[18px] ">{product.Price}₴</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <div className="flex  bg-blue-50 rounded border justify-between gap-2 items-center py-5 px-4 border-[#328044] mt-5">
                        <div className="text-center text-[30px] px-3 flex-1 text-black/80">{finalPrice}₴</div>
                        <button className="self-end font-medium text-[18px] text-white rounded-xl hover:bg-[#468153] transition-all py-4 px-6 bg-[#3fa357] w-50">
                            Оформить заказ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bucket;
