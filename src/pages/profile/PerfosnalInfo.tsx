import { useContext, useState } from "react";
import { authContext } from "../../AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import Skeleton from "../../components/UI/Skeleton";

const PerfosnalInfo = () => {
    const { user, setUser } = useContext(authContext);
    const { avatar_image, Login, Email, first_name, last_name, phone_number, customerID } = user || {};
    const {
        register,
        setError,
        handleSubmit,
        setValue,
        resetField,
        watch,
        reset,
        formState: { isSubmitting, errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            avatar_image,
            Login,
            Email,
            first_name,
            last_name,
            phone_number,
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        await axios.post("http://localhost:3001/logout", {}, { withCredentials: true });
        setUser(null);
        navigate("/login");
    };

    const onDelete = async () => {
        const res = await axios.patch(
            "http://localhost:3001/profile/delete",
            {customerID},
            { withCredentials: true }
        );
        if(avatar_image) setUser((prev) => ({ ...prev, avatar_image: res.data.avatar_url }));
        resetField('avatar_image')
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "avatar_image" && value && (value as FileList)[0]) {
                formData.append(key, (value as FileList)[0]);
            } else {
                formData.append(key, value as string); 
            }
        });
        formData.append("id", customerID);
        try {
            const res = await axios.patch("http://localhost:3001/profile/edit", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            setUser((prev) => ({ ...prev, ...data, avatar_image: res.data.avatar_url}));
            setIsEditing(false);
        } catch (err: any) {
            console.log(err);
            if (err.response.data.message === "Такой номер телефона уже существует") {
                setError("phone_number", { type: "server", message: "Такой номер телефона уже существует" });
            }
        }
        console.log(data);
        
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex md:flex-row flex-col gap-5 md:gap-10 items-center md:items-start"
        >
            {isSubmitting ? (
                <div className="flex-1">
                    <Skeleton />
                </div>
            ) : (
                <>
                    <div className="flex text-black/80 flex-col gap-2">
                        <img
                            src={avatar_image ? avatar_image : "avatar.webp"}
                            className="rounded-full object-cover h-40 w-40"
                            alt="avatar"
                        />
                        {isEditing && (
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-center cursor-pointer border-2 border-black/30 font-medium hover:text-white hover:bg-gray-700 active:bg-black rounded-lg px-2 py-1"
                                    htmlFor="avatar_image"
                                >
                                    {avatar_image ? "Изменить фото" : "Загрузить фото"}
                                </label>
                                <input
                                    accept="image/*"
                                    id="avatar_image"
                                    {...register("avatar_image")}
                                    type="file"
                                    className="hidden"
                                    
                                />
                                {avatar_image && (
                                    <button
                                        onClick={onDelete}
                                        type="button"
                                        className="border-2 border-black/30 hover:text-white hover:bg-gray-700 active:bg-black rounded-lg px-2 py-1"
                                    >
                                        Удалить фото
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="text-black/70 flex flex-col gap-4">
                        <div className="flex md:justify-normal justify-between gap-5">
                            <div className="">
                                <p className="text-[15px] text-black/50">Ваше имя</p>
                                {isEditing ? (
                                    <>
                                        <input
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
                                            className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                        />
                                        {errors.last_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.last_name.message as String}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-[18px]">{first_name}</p>
                                )}
                            </div>
                            <div className="">
                                <p className="text-[15px] text-black/50">Ваша фамилия</p>
                                {isEditing ? (
                                    <>
                                        <input
                                            {...register("last_name", {
                                                required: "Введите имя",
                                                minLength: {
                                                    value: 2,
                                                    message: "Слишком короткое имя",
                                                },
                                            })}
                                            onChange={(e) => {
                                                const filtered = e.target.value.replace(/[^ \p{L}]/gu, "");
                                                setValue("last_name", filtered);
                                            }}
                                            className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                        />
                                        {errors.last_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.last_name.message as String}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-[18px]">{last_name}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-[15px] text-black/50">Ваш логин</p>
                            {isEditing ? (
                                <input
                                    {...register("Login")}
                                    className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                />
                            ) : (
                                <p className="text-[18px]">{Login}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-[15px] text-black/50">Ваш email</p>
                            {isEditing ? (
                                <>
                                    <input
                                        {...register("Email", {
                                            required: "Введите email",
                                            pattern: {
                                                value: /^[^@]+@[^@]+\.[^@]+$/,
                                                message: "Неверный формат email",
                                            },
                                        })}
                                        className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                    />
                                    {errors.Email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.Email.message as String}</p>
                                    )}
                                </>
                            ) : (
                                <p className="text-[18px]">{Email}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-[15px] text-black/50">Номер телефона</p>
                            {isEditing ? (
                                <>
                                    <input
                                        {...register("phone_number", {
                                            required: "Заполните поле",
                                            minLength: {
                                                value: 10,
                                                message: "Минимум 10 цифр",
                                            },
                                        })}
                                        onChange={(e) => {
                                            const filtered = e.target.value.replace(/[^0-9]/g, "");
                                            setValue("phone_number", filtered);
                                        }}
                                        className="border border-black/20 outline-blue-400 rounded-[8px] px-2 py-1 text-black w-full"
                                    />
                                    {errors.phone_number && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phone_number.message as String}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p className="text-[18px]">{phone_number ?? "-"}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            {isEditing && (
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600  text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        onClick={() => reset()}
                                        type="button"
                                        className="w-full bg-gray-500  text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
                                    >
                                        Сбросить изменения
                                    </button>
                                </div>
                            )}
                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log("редакт");

                                        setIsEditing(true);
                                    }}
                                    className="w-full bg-blue-600  text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    Редактировать
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={logout}
                                className="w-full bg-red-600 mb-10 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </>
            )}
        </form>
    );
};

export default PerfosnalInfo;
