import type { Item } from "../../types/item";
import Box from "../../icons/box-delivery.svg?react";
import Done from "../../icons/done.svg?react";
import Bucket from "../../icons/button-bucket.svg?react";
import OutOfStock from "../../icons/out-of-stock.svg?react";
import { useState } from "react";
import "../productItem/productItem.css";
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface ProductProp {
    product: Item;
}

interface PicObj {
    photoID: number;
    enlarged: string | null;
    filename: string | null;
    thumbnail: string | null;
}

const ProductItem: React.FC<ProductProp> = ({ product }) => {
    const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<string>("");
    const [index, setIndex] = useState<number>(0)

    const rawArray = product.pictures?.map((pic:any) => pic.enlarged || pic.thumbnail || pic.filename)    

    const togglePictureSize = () => {
        setIsEnlarged(!isEnlarged);
    };

    const next = () => {
        setIndex((prev) => (prev === product.pictures?.length - 1 ? 0 : prev + 1));
    }
    const prev = () => {
        setIndex((prev) => (prev === 0 ? product.pictures?.length : prev - 1));
    }

    return (
        <div className="py-5 h-full px-5">
            {/* main content */}
            <div className="rounded-[10px] h-full bg-white flex flex-col gap-5 p-5 text-black/70 w-full ">
                <h1 className="text-center text-[25px] font-medium">
                    Кат.номер {product.product_code} - {product.name}
                </h1>
                <div className="flex gap-10">
                    <div className="min-w-[40%] max-w-[50%]">
                        <img
                            onClick={togglePictureSize}
                            src={`http://milotec.com.ua/pictures/${product.pictures?.[0].enlarged ||
                                product.pictures?.[0].thumbnail ||
                                product.pictures?.[product.pictures.length - 1].enlarged ||
                                product.pictures?.[product.pictures.length - 1].thumbnail}`}
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
                                    product.in_stock === 1 ? "text-[#42ab14]" : "text-[#ff4848]"
                                } flex-1 font-medium`}
                            >
                                {product.in_stock === 1 ? "Есть в наличии" : "Нет в наличии"}
                            </div>
                            {product.in_stock === 1 ? <Done className="w-[23px]" /> : <OutOfStock />}
                        </div>
                        <div className="text-[18px]" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                        <div className="text-[18px]">
                            Код продукта: <span className="font-medium">{product.product_code}</span>
                        </div>
                        <div className="flex justify-between text-[25px] p-4 font-medium text-[#333333] bg-[#eef3f6]">
                            <p>Цена:</p>
                            <p>{product.Price}₴</p>
                        </div>
                        <div className="w-full gap-2 flex justify-end">
                            <input
                                className="indent-1 border border-[#eceff1] rounded-[5px] w-10 outline-none input-no-spinner"
                                type="number"
                                placeholder="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <p className="text-gray-400 pr-2">Кол-во</p>
                        </div>
                        <div className="text-white font-medium py-4 text-[20px] items-center justify-center flex gap-2 bg-[#3fa357]">
                            <Bucket />
                            <button>В корзину</button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    {product.pictures &&
                        product.pictures.map((pic: PicObj, i: number) => (
                            <img
                                key={i}
                                onClick={togglePictureSize}
                                className="w-40 cursor-pointer"
                                src={`http://milotec.com.ua/pictures/${pic.enlarged || pic.thumbnail || pic.filename}`}
                                alt="no image"
                            />
                        ))}
                </div>
                {isEnlarged && (
                    <div onClick={togglePictureSize} className="absolute h-full w-full inset-0 p-20 bg-black/50">
                        <div className="w-full h-full px-30 flex justify-center items-center">
                                <div>
                                    <ChevronLeft className='stroke-white' />
                                </div>
                                <div className="">
                                    <img
                                        onClick={togglePictureSize}
                                        className="w-full bg-white h-full object-contain cursor-pointer"
                                        src={`http://milotec.com.ua/pictures/${rawArray[index]}`}
                                        alt="no image"
                                    />
                                    <div className="text-right text-[20px] text-white">{index + 1} / {rawArray.length}</div>
                                </div>
                                <div>
                                    <ChevronRight  className ='stroke-white'/>
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
