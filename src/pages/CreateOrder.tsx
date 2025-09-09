import { useForm } from "react-hook-form";

type OrderFormValues = {
    first_name: string;
    last_name: string;
    city: string;
    payment_method: string;
    phone_number: number;
    newPost_office: number;
    customerID: number;
    productID: [];
};

const CreateOrder = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<OrderFormValues>({
        mode: "onBlur",
    });

    return (
        <div className="p-2 md:p-5 text-black/80">
            <h3 className="text-center font-semibold text-[18px] mb-3 md:mb-5">Оформление заказа</h3>
            <form className="bg-white flex flex-col gap-3">
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
                        {...register('city', {
                            required: 'Введите название города',
                            minLength: {
                                value: 2,
                                message: 'Слишком мало букв'
                            }
                        })}
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateOrder;
