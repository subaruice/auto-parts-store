import type { FC, SetStateAction, Dispatch } from "react";
import { useForm } from "react-hook-form";
import { addNewProduct } from "../../features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import type { Product } from "../../types/product";

interface Props {
    setModal: Dispatch<SetStateAction<boolean>>;
}

const AddProduct: FC<Props> = ({ setModal }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onBlur" });
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector<RootState, Product[]>((state) => state.admin.products)

    const onSubmit = (data: any) => {
        dispatch(addNewProduct(data));
        setModal(false);
    };

    return (
        <form
            onClick={() => setModal(false)}
            onSubmit={handleSubmit(onSubmit)}
            className="fixed md:p-4 p-2 inset-0 z-50 bg-black/50 flex justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white flex flex-col justify-between grow rounded-lg md:p-4 p-2  max-w-200"
            >
                <h1 className="text-black/80 text-center mb-2 font-semibold text-xl">Добавление нового продукта</h1>

                <div className="">
                    <p className="text-[15px] text-black/50">Название продукта</p>
                    <div className="">
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
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as String}</p>}
                    </div>
                </div>
                <div className="">
                    <p className="text-[15px] text-black/50">Описание продукта</p>

                    <div className="">
                        <textarea
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
                </div>
                <div className="">
                    <p className="text-[15px] text-black/50">Код продукта</p>

                    <div className="">
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
                </div>
                <div className="">
                    <p className="text-[15px] text-black/50">Количество</p>
                    <div className="">
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
                </div>
                <div className="">
                    <p className="text-[15px] text-black/50">Обычная цена</p>

                    <div className="">
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
                        {errors.Price && <p className="text-red-500 text-sm mt-1">{errors.Price.message as String}</p>}
                    </div>
                </div>
                <div className="">
                    <p className="text-[15px] text-black/50">Акционная цена</p>

                    <div className="">
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
                </div>
                <button className="py-2 px-4 rounded-lg bg-green-500">Отправить</button>
            </div>
        </form>
    );
};

export default AddProduct;
