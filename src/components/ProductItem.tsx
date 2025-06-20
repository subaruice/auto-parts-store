import type { Item } from "../types/item";

interface ProductProp {
    product: Item
}

const ProductItem:React.FC<ProductProp> = ({product}) => {
    

  const lastImage = product.pictures?.[product.pictures.length - 1]?.enlarged;
  const middleImage = product.pictures?.[product.pictures.length - 1]?.thumbnail;
  const firstImage = product.pictures?.[product.pictures.length - 1]?.filename;
    return (
       <div className="bg-white w-full p-10">
            <div>{product.name}</div>
            <img src={`http://milotec.com.ua/pictures/${lastImage || middleImage || firstImage }`} alt="" />
       </div>
    );
};

export default ProductItem ;