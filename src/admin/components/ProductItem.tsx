import { memo, useState } from "react";
import type { Product } from "../../types/product";
import { useForm } from "react-hook-form";
import Skeleton from "../../components/UI/Skeleton";
import Notification from "../../components/UI/Notification";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { deleteProductById, updateProduct } from "../../features/adminSlice";

interface Props {
    product: Product | undefined;
}

const ProductItem: React.FC<Props> = memo(({ product }) => {
    const { productID, name, description, list_price, Price, product_code, in_stock } = product || {};
    const [showNotification, setShowNotification] = useState(false);
    const {
        handleSubmit,
        setValue,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            name,
            description,
            list_price,
            Price,
            product_code,
            in_stock,
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [notMessage, setNotMessage] = useState<string>();

    const onSubmit = async (data: any) => {
        const updated = { ...data, productID };
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL_DEV}/admin/patch-product`, updated, {
                withCredentials: true,
            });
            console.log(res.data);
            // if (res.data.message && res.data.message !== "Ничего не обновлено" && notMessage !== '') {
            setNotMessage(res.data.message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2500);
            // }
            dispatch(updateProduct(updated));
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = (id: number) => {
        dispatch(deleteProductById(id));
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="flex p-2 flex-col gap-5 md:gap-10 items-center"
        >
            {isSubmitting ? (
                <div className="flex-1">
                    <Skeleton />
                </div>
            ) : (
                <div className="text-black/70 flex w-full flex-col gap-4">
                    <div className="">
                        {showNotification && <Notification show={showNotification}>{notMessage}</Notification>}
                        <p className="text-[15px] text-black/50">Название продукта</p>

                        {isEditing ? (
                            <div className="flex">
                                <input
                                    {...register("name", {
                                        required: "Введите название продукта",
                                        minLength: {
                                            value: 2,
                                            message: "Слишком короткое название",
                                        },
                                    })}
                                    onChange={(e) => {
                                        const filtered = e.target.value.replace(/[^ \p{L}]/gu, "");
                                        setValue("name", filtered);
                                    }}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message as String}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[18px]">{name}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-[15px] text-black/50">Описание продукта</p>
                        {isEditing ? (
                            <div className="flex">
                                <input
                                    {...register("description", {
                                        required: "Введите описание продукта",
                                        minLength: {
                                            value: 2,
                                            message: "Слишком короткое описание",
                                        },
                                    })}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message as String}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[18px]">{description}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-[15px] text-black/50">Код продукта</p>
                        {isEditing ? (
                            <div className="flex">
                                <input
                                    {...register("product_code", {
                                        required: "Введите код продукта",
                                        minLength: {
                                            value: 2,
                                            message: "Слишком коротко",
                                        },
                                    })}
                                    onChange={(e) => {
                                        const filtered = e.target.value.replace(/[^0-9]/g, "");
                                        setValue("product_code", filtered);
                                    }}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                                {errors.product_code && (
                                    <p className="text-red-500 text-sm mt-1">{errors.product_code.message as String}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[18px]">{product_code}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-[15px] text-black/50">Количество</p>
                        {isEditing ? (
                            <div className="flex">
                                <input
                                    {...register("in_stock", {
                                        required: "Введите количество",
                                        minLength: {
                                            value: 2,
                                            message: "Слишком коротко",
                                        },
                                    })}
                                    onChange={(e) => {
                                        const filtered = e.target.value.replace(/[^0-9]/g, "");
                                        setValue("in_stock", Number(filtered));
                                    }}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                                {errors.in_stock && (
                                    <p className="text-red-500 text-sm mt-1">{errors.in_stock.message as String}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[18px]">{in_stock}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-[15px] text-black/50">Обычная цена</p>
                        {isEditing ? (
                            <div className="flex">
                                <input
                                    {...register("Price", {
                                        required: "Введите количество",
                                        minLength: {
                                            value: 2,
                                            message: "Слишком коротко",
                                        },
                                    })}
                                    onChange={(e) => {
                                        const filtered = e.target.value.replace(/[^0-9]/g, "");
                                        setValue("Price", Number(filtered));
                                    }}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                                {errors.Price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.Price.message as String}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[18px]">{Price}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-[15px] text-black/50">Акционная цена</p>
                        {isEditing ? (
                            <div className="flex">
                                <input
                                    {...register("list_price", {
                                        required: "Введите количество",
                                        minLength: {
                                            value: 2,
                                            message: "Слишком коротко",
                                        },
                                    })}
                                    onChange={(e) => {
                                        const filtered = e.target.value.replace(/[^0-9]/g, "");
                                        setValue("list_price", Number(filtered));
                                    }}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                                {errors.list_price && (
                                    <p className="text-red-500 text-sm mt-1">{errors.list_price.message as String}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-[18px]">{list_price}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-500 rounded-lg p-2 hover:bg-blue-600"
                                >
                                    Сохранить
                                </button>
                                <div
                                    onClick={() => reset()}
                                    className="text-center text-white bg-red-500 rounded-lg p-2 hover:bg-red-600"
                                >
                                    Сбросить изменения
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    onClick={() => setIsEditing(true)}
                                    className="text-center text-white bg-blue-500 rounded-lg p-2 hover:bg-blue-600"
                                >
                                    Редактировать
                                </div>
                                <div
                                    onClick={() => {
                                        productID && onDelete(productID);
                                        setIsEditing(true);
                                    }}
                                    className="text-white text-center bg-red-500 rounded-lg p-2 hover:bg-red-600"
                                >
                                    Удалить
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </form>
    );
});

export default ProductItem;
