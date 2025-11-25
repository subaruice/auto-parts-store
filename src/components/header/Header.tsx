import { ShoppingCart } from "lucide-react";
import SearchIcon from "../../icons/search-icon.svg?react";
import UserProfile from "../../icons/user-profile.svg?react";
import { Link, useNavigate } from "react-router";
import { memo, useContext, useEffect, useState } from "react";
import Notification from "../UI/Notification";
import { authContext } from "../../AuthContext";
import { CircleUser } from "lucide-react";

interface HeaderProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = memo(({ search, setSearch }) => {
    const { user } = useContext(authContext);
    const [productsCounter, setProductsCounter] = useState(0);
    const [showEmptyBucket, setShowEmptyBucket] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleCouter = () => {
            const storage = JSON.parse(localStorage.getItem("products") || "[]");
            if (storage.length > 0) {
                const updated = storage.reduce((acc: number, product: any) => acc + Number(product.quantity), 0);
                setProductsCounter(updated);
            } else {
                setProductsCounter(0);
            }
        };
        window.addEventListener("customEvent", handleCouter);
        handleCouter();
        return () => window.removeEventListener("customEvent", handleCouter);
    }, [location.pathname]);

    const toggleEmptyBucket = (e: any) => {
        const existing = JSON.parse(localStorage.getItem("products") || "[]");
        if (existing.length < 1) {
            e.preventDefault();
            setShowEmptyBucket(true);
        }
        setTimeout(() => {
            setShowEmptyBucket(false);
        }, 2500);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate("/catalog");
        }
    };

    return (
        <div className="flex min-h-[87px] w-full border-b-[0.5px] border-black/30 ">
            <div className="p-[26px] flex-1">
                <form onKeyDown={onKeyDown} className="flex gap-[22px]">
                    <SearchIcon />
                    <input
                        name="search"
                        className="w-full text-black/70 outline-none text-[20px] placeholder:text-[20px] placeholder:text-black/30"
                        placeholder="Поиск по названию, код-детали..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                    />
                </form>
            </div>
            <div className="flex items-center">
                <div className="h-full flex items-center px-[18px] border-x-[0.5px] border-black/30">
                    <Link to={"/profile"}>
                        {!user ? (
                            <UserProfile
                                color="#8D99AD"
                                className="cursor-pointer hover:stroke-gray-600 active:stroke-gray-900"
                            />
                        ) : (
                            <>
                            {user.avatar_image ? (
                                    <img src={user.avatar_image} alt="user_image" className="w-8 object-cover h-8 rounded-full"/>
                            ) : (

                                <CircleUser
                                    color="#8D99AD"
                                    className=" w-8 h-8  cursor-pointer hover:stroke-gray-600 active:stroke-gray-900"
                                />
                            )}
                            </>
                        )}
                    </Link>
                </div>
                <div className="px-[18px] flex items-center">
                    <Link className="relative" onClick={(e) => toggleEmptyBucket(e)} to="/bucket">
                        <ShoppingCart
                            color="#8D99AD"
                            strokeWidth="2px"
                            width="32px"
                            height="32px"
                            className="cursor-pointer hover:stroke-gray-600 active:stroke-gray-900"
                        />
                        {productsCounter > 0 && (
                            <div className="text-white rounded-full absolute -top-1 -right-1 bg-red-600 flex items-center justify-center w-5 h-5">
                                {productsCounter}
                            </div>
                        )}
                    </Link>
                    {showEmptyBucket && <Notification show={showEmptyBucket}>Корзина пуста</Notification>}
                </div>
            </div>
        </div>
    );
});

export default Header;
