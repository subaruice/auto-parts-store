import { useState } from "react";
import Burger from "../../icons/burger-icon.svg?react";
import Xmark from "../../icons/x-mark.svg?react";
import Profile from "../../icons/profile.svg?react";
import HeadLogo from "../../icons/logo-head.png";
import Bucket from "../../icons/bucket.svg?react";

const HeaderMobile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="h-16 w-full  bg-[#2B2D41] flex items-center px-2 justify-between">
            <Burger onClick={toggleSidebar}  className="cursor-pointer" />
            {isSidebarOpen && (
                <div className="absolute inset-0 w-full h-full bg-black opacity-50">
                    <Xmark onClick={toggleSidebar}/>
                </div>
            )}
            <img src={HeadLogo} className="cursor-pointer h-10" alt="Header Logo" />
            <div className="flex gap-1">
                <Profile className="w-9 h-9" />
                <Bucket className="h-9" />
            </div>
        </div>
    );
};

export default HeaderMobile;
