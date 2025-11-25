import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { authContext } from "../AuthContext";

type LoginFormValues = {
    email: string;
    password: string;
};

const Login = () => {
    const { user, setUser } = useContext(authContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        mode: "onBlur", 
    });
    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user]);

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL_DEV}/login`, data, { withCredentials: true });
            if (res.data.user) {
                setUser(res.data.user);
                navigate("/profile", { replace: true });
            }
        } catch (err: any) {
            if (err.response?.data?.message === "Неправильный имейл") {
                setError("email", { type: "server", message: "Неправильный имейл" });
            } else if (err.response?.data?.message === "Неправильный пароль") {
                setError('password', { type: "server", message: "Неправильный пароль" });
            }
        }
    };

    return (
        <div className="flex text-black/80 items-start justify-center min-h-screen p-2 md:p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white flex  justify-center px-6 pt-10 pb-25 rounded-lg shadow-lg w-full max-w-xl"
            >
                <div className="max-w-sm w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
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

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Пароль</label>
                        <input
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

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 mb-5 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Входим..." : "Войти"}
                    </button>
                    <div className="text-black/50 flex gap-2">
                        <p>Нет аккаунта?</p>
                        <Link
                            className="hover:text-sky-600 active:text-sky-800 !underline text-black/80"
                            to={"/registration"}
                        >
                            Зарегестрироваться
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
