import { useState } from "react";
import Burger from "../../icons/burger-icon.svg?react";
import Xmark from "../../icons/x-mark.svg?react";
import Profile from "../../icons/profile.svg?react";
import HeadLogo from '../../icons/logo-head.png';
import Bucket from '../../icons/bucket.svg?react';

const HeaderMobile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    return (
        <div className="h-16 w-full bg-[#2B2D41] flex items-center px-2 justify-between">
            <Burger className="" />
            <img src={HeadLogo} className="h-10" alt="Header Logo" />
            <div className="flex gap-1">
            <Profile className="w-9 h-9"/>
            <Bucket className="h-9"/>
            </div>
        </div>
    );
};

export default HeaderMobile;
