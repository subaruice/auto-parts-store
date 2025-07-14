import ShoppingIcon from "../../icons/shopping-cart.svg?react";
import SearchIcon from "../../icons/search-icon.svg?react";
import UserProfile from "../../icons/user-profile.svg?react";
import { Link } from "react-router";
import { memo } from "react";

interface HeaderProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = memo(({ search, setSearch }) => {
    return (
        <div className="flex min-h-[87px] w-full border-b-[0.5px] border-black/30 ">
            <div className="p-[26px]  flex-1">
                <form action="" className="flex gap-[22px]">
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
                    <UserProfile className="cursor-pointer" />
                </div>
                <div className="px-[18px] flex items-center">
                    <Link to={"/bucket"}>
                        <ShoppingIcon className="cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default Header;
