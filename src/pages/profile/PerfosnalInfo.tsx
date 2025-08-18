import { useContext, useState } from "react";
import { authContext } from "../../AuthContext";
import { useForm } from "react-hook-form";

const PerfosnalInfo = () => {
    const { user } = useContext(authContext);
    const { avatar_image, Login, Email, first_name, last_name, phone_number } = user || {};
    const {
        register,
        setError,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, errors },
    } = useForm({
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

    const handleClick = () => {
        setIsEditing(true);
    }

    const onSubmit = (data: any) => {
        console.log(data);
        setIsEditing(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col gap-5 md:gap-10 items-center md:items-start">
            <img src={avatar_image ?? "avatar.webp"} className="rounded-full h-40 w-40" alt="avatar" />
            <div className="text-black/70 flex flex-col gap-4">
                <div className="flex md:justify-normal justify-between gap-5">
                    <div className="">
                        <p className="text-[15px] text-black/50">Ваше имя</p>
                        {isEditing ? (
                            <input {...register("first_name")} className="border border-black/20 outline-blue-400 rounded px-2 py-1 text-black w-full" />
                        ) : (
                            <p className="text-[18px]">{first_name}</p>
                        )}
                    </div>
                    <div className="">
                        <p className="text-[15px] text-black/50">Ваша фамилия</p>
                        {isEditing ? (
                            <input {...register("last_name")} className="border border-black/20 outline-blue-400 rounded px-2 py-1 text-black w-full" />
                        ) : (
                            <p className="text-[18px]">{last_name}</p>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-[15px] text-black/50">Ваш логин</p>
                    {isEditing ? (
                        <input {...register("Login")} className="border border-black/20 outline-blue-400 rounded px-2 py-1 text-black w-full" />
                    ) : (
                        <p className="text-[18px]">{Login}</p>
                    )}
                </div>
                <div>
                    <p className="text-[15px] text-black/50">Ваш email</p>
                    {isEditing ? (
                        <input {...register("Email")} className="border border-black/20 outline-blue-400 rounded px-2 py-1 text-black w-full" />
                    ) : (
                        <p className="text-[18px]">{Email}</p>
                    )}
                </div>
                <div>
                    <p className="text-[15px] text-black/50">Номер телефона</p>
                    {isEditing ? (
                        <input {...register("phone_number")} className="border border-black/20 outline-blue-400 rounded px-2 py-1 text-black w-full" />
                    ) : (
                        <p className="text-[18px]">{phone_number ?? '-'}</p>
                    )}
                </div>
                <button
                    type={isEditing ? 'submit' : 'button'}
                    onClick={() => !isEditing && setIsEditing(true)}
                    className="w-full bg-blue-600 mb-5 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isEditing ? "Сохранить" : "Редактировать"}
                </button>
            </div>
        </form>
    );
};

export default PerfosnalInfo;
