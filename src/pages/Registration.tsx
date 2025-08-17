import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Skeleton from "../components/UI/Skeleton";
import { useContext, useEffect } from "react";
import { authContext } from "../AuthContext";

type LoginFormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    login: string;
};

export default function Registration() {
    const { user, setUser } = useContext(authContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        mode: "onBlur",
    });

    useEffect(() => {
        if (user) {
            navigate("/profile", {replace: true});
        }
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Reg data:", data);
        try {
            await axios.post("http://localhost:3001/registration", data, { withCredentials: true });
            setUser(data);
            navigate("/profile");
            reset();
        } catch (err: any) {
            console.error(err.response.data.message);
        }
    };

    return (
        <div className="flex text-black/80 items-start justify-center min-h-screen p-2 md:p-4 bg-gray-100">
            {isSubmitting ? (
                <div>
                    <Skeleton />
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white flex  justify-center px-6 pt-10 pb-25 rounded-lg shadow-lg w-full max-w-xl"
                >
                    <div className="max-w-sm w-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Имя или никнейм</label>
                            <input
                                autoComplete="login"
                                type="text"
                                placeholder="example"
                                {...register("login", {
                                    required: "Введите имя или никнейм",
                                    minLength: {
                                        value: 2,
                                        message: "Слишком короткое имя",
                                    },
                                })}
                                className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                autoComplete="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    required: "Введите email",
                                    pattern: {
                                        value: /^[^@]+@[^@]+\.[^@]+$/,
                                        message: "Неверный формат email",
                                    },
                                })}
                                className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Пароль</label>
                            <input
                                autoComplete="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Введите пароль",
                                    minLength: {
                                        value: 6,
                                        message: "Минимум 6 символов",
                                    },
                                })}
                                className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Повторите пароль</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Введите пароль",
                                    validate: (value: string) => {
                                        const { password } = getValues();
                                        return value === password || "Пароли не свпадают";
                                    },
                                })}
                                className="w-full px-3 py-2 border border-black/20 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 mb-5 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isSubmitting ? "Регистрируем..." : "Зарегистрироваться"}
                        </button>
                        <div className="text-black/50 flex gap-2">
                            <p>Есть аккаунт?</p>
                            <Link
                                className="hover:text-sky-600 active:text-sky-800 !underline text-black/80"
                                to={"/login"}
                            >
                                Войти
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
