import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { authContext } from "../AuthContext";

type OrderFormValues = {
    first_name: string;
    last_name: string;
    city: string;
    payment_method: string;
    phone_number: number | string;
    newPost_office: number | string;
    customerID: number | string;
    productID: [];
};

type FormValues = Omit<OrderFormValues, "customerID" | "productID">;

const CreateOrder = () => {
    const { user } = useContext(authContext);
    const products = JSON.parse(localStorage.getItem("products") || "");
    const navigate = useNavigate();

    const sortedProducts = products.map((p: any) => ({
        productID: p.productID,
        quantity: p.quantity,
    }));

    const sum =  products.reduce((acc: number, product: any) => acc + product.Price, 0)

    const {
        register,
        handleSubmit,
        
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        mode: "onBlur",
    });

    const onSubmit = async (data: FormValues) => {
        const payload: OrderFormValues = {
            ...data,
            productID: sortedProducts,
            customerID: user?.customerID || "",
        };
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL_DEV}/accept-order`, payload, { withCredentials: true });
        console.log(res.data.message);
        localStorage.removeItem("products");
        navigate("/");
    };

    return (
        <div className="p-2 md:p-5 text-black/80">
            <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-5 bg-white rounded-xl flex flex-col gap-3">
                <h3 className=" text-center font-semibold text-[18px] mb-3 md:mb-5">Оформление заказа</h3>
                <div className="flex gap-2">
                    <div>
                        <label className="block text-sm font-medium mb-1">Имя</label>
                        <input
                            autoComplete="Name"
                            type="text"
                            placeholder="Имя"
                            {...register("first_name", {
                                required: "Введите имя",
                                minLength: {
                                    value: 2,
                                    message: "Слишком короткое имя",
                                },
                            })}
                            onChange={(e) => {
                                const filtered = e.target.value.replace(/[^ \p{L}]/gu, "");
                                setValue("first_name", filtered);
                            }}
                            className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Фамилия</label>
                        <input
                            autoComplete="Surname"
                            type="text"
                            placeholder="Фамилия"
                            {...register("last_name", {
                                required: "Введите фамилию",

                                minLength: {
                                    value: 2,
                                    message: "Слишком короткая фамилия",
                                },
                            })}
                            onChange={(e) => {
                                const filtered = e.target.value.replace(/[^ \p{L}]/gu, "");
                                setValue("last_name", filtered);
                            }}
                            className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Ваш город:</label>
                    <input
                        type="text"
                        placeholder="Введите город получения"
                        className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("city", {
                            required: "Введите название города",
                            minLength: {
                                value: 2,
                                message: "Слишком мало букв",
                            },
                        })}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Номер отделения Новой Почты</label>
                    <input
                        type="text"
                        placeholder="Введите номер отделения"
                        className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("newPost_office", {
                            required: "Введите номер отделения",
                        })}
                        onChange={(e) => {
                            const filtered = e.target.value.replace(/[^0-9]/g, "");
                            setValue("newPost_office", filtered);
                        }}
                    />
                    {errors.newPost_office && (
                        <p className="text-red-500 text-sm mt-1">{errors.newPost_office.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Номер получателя</label>
                    <input
                        type="text"
                        placeholder="Введите номер получателя"
                        className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("phone_number", {
                            required: "Введите номер получателся",
                            minLength: {
                                value: 2,
                                message: "Слишком мало букв",
                            },
                        })}
                        onChange={(e) => {
                            const filtered = e.target.value.replace(/[^0-9]/g, "");
                            setValue("phone_number", filtered);
                        }}
                    />
                    {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
                </div>
                <label className="block text-sm font-medium mb-1">Выберите способ оплаты</label>
                <div className="flex gap-5">
                    <label>
                        <input
                            className="mr-2"
                            value="cod"
                            type="radio"
                            {...register("payment_method", { required: "Выберите способ доставки" })}
                        />
                        Наложенным платежом
                    </label>
                    <label>
                        <input
                            className="mr-2"
                            value="bank_transfer"
                            type="radio"
                            {...register("payment_method", { required: "Выберите способ доставки" })}
                        />
                        Перевод на банковскую карту
                    </label>
                    {errors.payment_method && (
                        <p className="text-red-500 text-sm mt-1">{errors.payment_method.message}</p>
                    )}
                </div>
                <div className="flex flex-col font-medium text-[15px] gap-3">
                    Ваш заказ:{" "}
                    {products &&
                        products.map((p: any, id: number) => (
                            <div className="space-x-4 font-normal">
                                <span>
                                    {`${id + 1}.`}
                                    {p.name}
                                </span>
                                <span className="text-black/40">{` x${p.quantity}`}</span>
                            </div>
                        ))}
                </div>
                <div className="font-medium text-[15px]">
                    На сумму: <span className="font-normal">{sum}₴</span>
                    
                </div>
                <button type="submit" className="mb-4 max-w-50 px-3 py-2 bg-green-500 rounded-lg text-white ">
                    Отправить заказ
                </button>
            </form>
        </div>
    );
};

export default CreateOrder;
