import axios from "axios";
import { Phone, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

type ContactFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
};

const Contacts = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>();

    const onSubmit = async (data: ContactFormValues) => {
        console.log("Отправка формы:", data);
        const res = await axios.post('http://localhost:3001/feedback', data)
        reset();
    };

    return (
        <section className="md:p-4 p-2">
            <div className="bg-white p-2 md:p-4 text-black/70 flex lg:flex-row flex-col">
                <div className="flex-1/2 flex text-[17px] flex-col gap-4 md:gap-8">
                    <h1 className="text-black/80 text-[20px] font-semibold">Оставайтесь с нами!</h1>
                    <div className="flex gap-4 items-center">
                        <MapPin className="stroke-[#3e4b85] w-5 h-5" />
                        <p>улица Бородича 17, Кривой Рог, Украина</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Phone className="stroke-[#3e4b85] w-5 h-5" />
                        <a href="tel:+380660510001">+380660510001</a>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Mail className="stroke-[#3e4b85] w-5 h-5" />
                        <a className="text-sky-900" href="mailto:info@milotec.com.ua">
                            info@milotec.com.ua
                        </a>
                    </div>
                </div>

                {/* Правая часть с формой */}
                <div className="flex-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
                        <h2 className="text-[20px] font-bold text-center">Форма обратной связи</h2>
                        <div className="flex gap-2">
                            {/* Имя */}
                            <div className="flex-1/2">
                                <label className="block font-medium">Имя</label>
                                <input
                                    {...register("firstName", { required: "Введите имя" })}
                                    type="text"
                                    className="w-full  border border-black/20 rounded p-2"
                                    placeholder="Ваше имя"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                            </div>

                            {/* Фамилия */}
                            <div className="flex-1/2">
                                <label className="block font-medium">Фамилия</label>
                                <input
                                    {...register("lastName", { required: "Введите фамилию" })}
                                    type="text"
                                    className="w-full  border border-black/20 rounded p-2"
                                    placeholder="Ваша фамилия"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block font-medium">Email</label>
                            <input
                                {...register("email", {
                                    required: "Введите email",
                                    pattern: {
                                        value: /^[^@]+@[^@]+\.[^@]+$/,
                                        message: "Введите корректный email",
                                    },
                                })}
                                type="email"
                                className="w-full  border border-black/20 rounded p-2"
                                placeholder="Ваш email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Сообщение */}
                        <div>
                            <label className="block font-medium">Сообщение</label>
                            <textarea
                                {...register("message", {
                                    required: "Введите сообщение",
                                    minLength: {
                                        value: 10,
                                        message: "Минимум 10 символов",
                                    },
                                })}
                                rows={4}
                                className="w-full  !border !border-black/20 rounded p-2"
                                placeholder="Ваше сообщение"
                            />
                            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                        </div>

                        {/* Кнопка */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {isSubmitting ? "Отправка..." : "Отправить"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contacts;
