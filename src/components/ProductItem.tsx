import type { Item } from "../types/item";

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
    return (
        <div className="py-5 px-10">
            <div className="bg-white p-2 flex text-black/70 w-full ">
                <div>
                    {product.pictures &&
                        product.pictures.map((pic: PicObj) => (
                            <img
                                src={`http://milotec.com.ua/pictures/${pic.enlarged || pic.thumbnail || pic.filename}`}
                                alt=""
                            />
                        ))}
                </div>
                <div>
                    <div className="text-[20px] font-s">{product.name}</div>

                    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
