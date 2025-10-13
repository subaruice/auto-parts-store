import { ArrowBigLeft } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

const Sidebar: React.FC = () => {
    const location = useLocation();
    return (
        <div className="min-w-60 bg-gray-700 text-lg text-center min-h-screen p-4 flex flex-col gap-4">
            <Link to={'/'} className="flex justify-center bg-white font-medium rounded-lg p-1 items-center gap-1">
                <ArrowBigLeft className="w-10 h-10"/>
                <p>На клиент</p>
            </Link>
            <Link
                to={""}
                className={`${location.pathname === "/admin" ? "bg-black/70 border border-white/70 " : ""} border border-white/70 !text-white/80 rounded-lg  p-2 `}
            >
                Главная
            </Link>
            <Link
                to={"users"}
                className={`${location.pathname === "/admin/users" ? "bg-black/70 border border-white/70 " : ""} border border-white/70 !text-white/80 rounded-lg  p-2 `}
            >
                Пользователи
            </Link>
            <Link
                to={"products"}
                className={`${location.pathname === "/admin/products" ? "bg-black/70 border border-white/70 " : ""} border border-white/70 !text-white/80 rounded-lg  p-2 `}
            >
                Продукты
            </Link>
        </div>
    );
};

export default Sidebar;
