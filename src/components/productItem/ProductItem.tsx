import type { Item } from "../../types/item";
import Box from "../../icons/box-delivery.svg?react";
import Done from "../../icons/done.svg?react";
import Bucket from "../../icons/button-bucket.svg?react";
import OutOfStock from "../../icons/out-of-stock.svg?react";
import { useState } from "react";
import "../productItem/productItem.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Xmark from "../../icons/x-mark.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import CommonAdvantages from "../productAdvantages/CommonAdvantages";
import { useOutletContext } from "react-router";
import { memo } from "react";
import Notification from "../UI/Notification";

interface ProductProp {
    product: Item;
}

interface PicObj {
    photoID: number;
    enlarged: string | null;
    filename: string | null;
    thumbnail: string | null;
}

const ProductItem = memo(() => {
    const { product } = useOutletContext<ProductProp>();
    const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<string>("1");
    const [index, setIndex] = useState<number>(0);
    const [showAddBucketMessage, setShowAddBucketMessage] = useState(false);

    const rawArray = product.pictures?.map((pic: any) => pic.enlarged || pic.thumbnail || pic.filename);

    const storeProducts = () => {
        const stored = JSON.parse(localStorage.getItem("products") ?? "[]");
        let existing = false;
        const updated = stored.map((p: any) =>
            p.productID === product.productID
                ? ((existing = true), { ...p, quantity: Number(quantity) + p.quantity })
                : p
        );
        if (!existing) {
            updated.push({ ...product, quantity: Number(quantity) });
        }
        localStorage.setItem("products", JSON.stringify(updated));
        window.dispatchEvent(new Event('customEvent'))
        setShowAddBucketMessage(true);
        setTimeout(() => {
            setShowAddBucketMessage(false);
        }, 2500);
    };



    const openPreview = (id: number) => {
        return () => {
            if (!isEnlarged) {
                setIndex(id);
            }
            setIsEnlarged(!isEnlarged);
        };
    };

    const closePreview = () => {
        setIsEnlarged(!isEnlarged);
    };

    const next = () => {
        setIndex((prev) => (prev === product.pictures?.length - 1 ? 0 : prev + 1));
    };
    const prev = () => {
        setIndex((prev) => (prev === 0 ? product.pictures?.length - 1 : prev - 1));
    };

    const sale = Math.floor((product.list_price - product.Price) / product.list_price * 100)

    return (
        <div className="p-2 lg:py-5 h-full lg:px-5">
            {showAddBucketMessage && <Notification show={showAddBucketMessage}>Товар добавлен в корзину</Notification>}
            {/* main content */}
            <div className="rounded-[10px] h-full bg-white flex flex-col gap-5 p-2 sm:p-5 text-black/70 w-full ">
                <h1 className="text-center text-[18px] lg:text-[25px] font-medium">
                    Кат.номер {product.product_code} - {product.name}
                </h1>
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
                    <div className="flex items-center justify-center lg:min-w-[40%] lg:max-w-[50%]">
                        <img
                            onClick={openPreview(0)}
                            src={product.pictures && product.pictures[0].photoID === null ? "/auto-parts-store/no-image.jpg" : `http://milotec.com.ua/pictures/${rawArray && rawArray[0]}`}
                            alt="No image"
                            className="cursor-pointer"
                        />
                    </div>
                    {/* product information */}
                    <div className="flex flex-col gap-4 w-full">
                        <div className="w-full flex border py-1 px-2 rounded-[5px] items-center border-[#eceff1] justify-between">
                            <Box className="w-[23px] mr-3" />
                            <div
                                className={`${
                                    product.in_stock > 0 ? "text-[#42ab14]" : "text-[#ff4848]"
                                } flex-1 font-medium`}
                            >
                                {product.in_stock > 0 ? "Есть в наличии" : "Нет в наличии"}
                            </div>
                            {product.in_stock > 0 ? <Done className="w-[23px]" /> : <OutOfStock />}
                        </div>
                        <div className="text-[18px]" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                        <div className="text-[18px]">
                            Код продукта: <span className="font-medium">{product.product_code}</span>
                        </div>
                        <div className="flex relative justify-between text-[25px] p-4 font-medium text-[#333333] bg-[#eef3f6]">
                            {product.list_price > 0 && (
                                <div className="bg-red-600 absolute text-white text-[18px] -top-[35%] lg:-top-[60%] px-4 py-1 right-3">-{sale}%</div>
                            )}
                            <p>Цена:</p>
                            <div className="relative">{product.Price}₴
                                {product.list_price > 0 && (
                                    <div className="absolute text-[14px] -top-[25%] text-nowrap text-black/60 line-through right-0">{product.list_price} ₴</div>
                                )}
                            </div>
                        </div>
                        <div className="w-full gap-2 flex justify-end">
                            <input
                                className="indent-1 border border-[#eceff1] rounded-[5px] w-10 outline-none input-no-spinner"
                                type="number"
                                placeholder=""
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <p className="text-gray-400 pr-2">Кол-во</p>
                        </div>
                        <div
                            onClick={storeProducts}
                            className={`${
                                product.in_stock === 0
                                    ? "pointer-events-none bg-[#94c29f]"
                                    : "active:bg-green-950 cursor-pointer hover:bg-[#468153] bg-[#3fa357]"
                            } text-white font-medium py-4 text-[20px] items-center justify-center flex gap-2`}
                        >
                            <Bucket />
                            <button>В корзину</button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 overflow-auto">
                    {product.pictures &&
                        rawArray.map((pic: PicObj, i: number) => (
                            <img
                                key={i}
                                onClick={openPreview(i)}
                                className="w-40 cursor-pointer"
                                src={`http://milotec.com.ua/pictures/${pic}`}
                                alt="no image"
                            />
                        ))}
                </div>
                <AnimatePresence mode="wait">
                    {isEnlarged && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePreview}
                            className="fixed flex items-center justify-center inset-0 bg-black/50"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-screen-xl flex justify-center items-center"
                            >
                                <div className="cursor-pointer  flex justify-center">
                                    <ChevronLeft
                                        onClick={prev}
                                        className="h-12 lg:hover:w-35 transition-all stroke-white w-12 lg:w-30 "
                                    />
                                </div>
                                <div className="flex items-center justify-center w-full relative">
                                    <Xmark
                                        onClick={closePreview}
                                        className="absolute hover:w-12 transition-all cursor-pointer -top-12 -right-12 w-10 text-white"
                                    />
                                        <motion.img
                                            onClick={closePreview}
                                            className="max-w-[100%] bg-white object-contain cursor-pointer"
                                            src={`http://milotec.com.ua/pictures/${rawArray[index]}`}
                                            alt="no image"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            key={index}
                                        />
                                    <div className="absolute -bottom-6 right-0 text-right text-[20px] text-white">
                                        {index + 1} / {rawArray.length}
                                    </div>
                                </div>
                                <div className="cursor-pointer flex justify-center">
                                    <ChevronRight
                                        onClick={next}
                                        className="lg:hover:w-35 w-12 transition-all stroke-white lg:w-30 h-12"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <CommonAdvantages />
            </div>
        </div>
    );
});

export default ProductItem;
