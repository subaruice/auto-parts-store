import axios from "axios";
import { Phone, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import Notification from "../components/UI/Notification";
import { useState } from "react";

type ContactFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
};

const Contacts = () => {
    const [showMessage, setIsShowMessage] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>();

    const onSubmit = async (data: ContactFormValues) => {
        try {
            setIsShowMessage(true);
            setTimeout(() => {
                setIsShowMessage(false);
            }, 2500);
            await axios.post(`${import.meta.env.VITE_BASE_URL_DEV}/feedback`, data);
        } catch (err) {
            console.log(err);
        } finally {
            reset();
        }
    };

    return (
        <section className="md:p-4 p-2">
            <div className="bg-white p-2 md:p-4 text-black/70 gap-4 flex md:flex-row flex-col">
                <div className="flex-1/2 flex flex-col gap-4">
                    <div className="flex text-[17px] flex-col gap-4 md:gap-8">
                        <h1 className="text-center md:text-start text-black/80 text-[20px] font-semibold">
                            Оставайтесь с нами!
                        </h1>
                        <div className="flex  flex-col  items-start">
                            <div className="flex gap-4 items-center">
                                <MapPin className="stroke-[#3e4b85] w-5 h-5" />
                                <p>улица Бородича 17, Кривой Рог, Украина</p>
                            </div>
                            <a
                                className="text-[14px] indent-9 text-sky-950 !underline"
                                href="https://maps.app.goo.gl/bLK4bduTq1FUZfMu9"
                            >
                                https://maps.app.goo.gl/bLK4bduTq1FUZfMu9
                            </a>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Phone className="stroke-[#3e4b85] w-5 h-5" />
                            <a className="text-sky-900" href="tel:+380660510001">
                                +380660510001
                            </a>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Mail className="stroke-[#3e4b85] w-5 h-5" />
                            <a className="text-sky-950 !underline" href="mailto:info@milotec.com.ua">
                                info@milotec.com.ua
                            </a>
                        </div>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.598664341972!2d33.4294296!3d47.905452721608015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40db2178999a417d%3A0x3b7c00bf82a0fd08!2z0KjQutC-0LTQsCDRgtGO0L3QuNC90LM!5e0!3m2!1sru!2sua!4v1755152182266!5m2!1sru!2sua"
                        className="w-full h-112.5"
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="flex-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
                        <h2 className="text-[20px] font-bold text-center">Форма обратной связи</h2>
                        <div className="flex gap-2">
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
            {showMessage && <Notification show={showMessage}>Сообщение отправлено</Notification>}
        </section>
    );
};

export default Contacts;
