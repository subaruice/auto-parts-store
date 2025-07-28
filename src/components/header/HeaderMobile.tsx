import { memo, useEffect, useState } from "react";
import Burger from "../../icons/burger-icon.svg?react";
import UserProfile from "../../icons/user-profile.svg?react";
import HeadLogo from "../../icons/logo-head.png";
import { ShoppingCart } from "lucide-react";
import SidebarMobile from "../sibebar/SidebarMobile";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import EmptyBucket from "../UI/EmptyBucket";

interface Props {
    categoryID?: string | undefined;
    [key: string]: any;
}

const HeaderMobile: React.FC<Props> = memo(({ categoryID, categories }) => {
    const [productsCounter, setProductsCounter] = useState(0);
    const [showEmptyBucket, setShowEmptyBucket] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
    }, []);

    const toggleEmptyBucket = (e: any) => {
        setIsSidebarOpen(false)
        const existing = JSON.parse(localStorage.getItem("products") || "[]");
        if (existing.length < 1) {
            e.preventDefault();
            setShowEmptyBucket(true);
        }
        setTimeout(() => {
            setShowEmptyBucket(false);
        }, 2500);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="py-3 w-full bg-[#2B2D41] flex items-center px-2 justify-between">
            <AnimatePresence mode="wait">
                {isSidebarOpen ? (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <X onClick={toggleSidebar} width="32" height="32" color="white" className="cursor-pointer" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <Burger onClick={toggleSidebar} className="cursor-pointer" />
                    </motion.div>
                )}

                {isSidebarOpen && (
                    <motion.div
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.1 }}
                        onClick={toggleSidebar}
                        className="z-50 overflow-auto fixed top-16 bottom-0 right-0 left-0 bg-black/50"
                    >
                        <SidebarMobile categoryID={categoryID} categories={categories} />
                    </motion.div>
                )}
            </AnimatePresence>
            <Link onClick={() => setIsSidebarOpen(false)} to={'/'}>
                <img src={HeadLogo} className="cursor-pointer h-10" alt="Header Logo" />
            </Link>
            <div className="flex gap-2">
                <UserProfile stroke="#dfdfdf" className="cursor-pointer hover:stroke-gray-600 active:stroke-gray-900" />
                <Link className="relative" onClick={(e) => toggleEmptyBucket(e)} to="/bucket">
                    <ShoppingCart
                        color="#dfdfdf"
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
                {showEmptyBucket && <EmptyBucket show={showEmptyBucket} />}
            </div>
        </div>
    );
});

export default HeaderMobile;
