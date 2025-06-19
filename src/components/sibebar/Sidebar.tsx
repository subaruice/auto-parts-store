import Logo from "../../icons/logo-head.png";
import Home from "../../icons/home.svg?react";
import Call from "../../icons/call.svg?react";
import About from "../../icons/about.svg?react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

interface CategoriesProp {
    categories: any;
}

const Sidebar: React.FC<CategoriesProp> = ({ categories }) => {
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>();

    const toggleSub = (id: number) => {
        setActiveCategoryId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="flex flex-col pl-2 py-4 bg-[#2B2D41] shrink-0 w-[320px]">
            <div className="flex px-8 mb-3 justify-center items-center">
                <img src={Logo} className="w-[90%]" alt="" />
            </div>
            <div className="flex">
                <div className="flex mt-15 self-start gap-5 flex-col">
                    <Home />
                    <Call />
                    <About />
                </div>
                <div className="w-full pl-4">
                    {/* <p className="text-[30px] w-[100%] text-center pb-2 text-gray-200">
                            Каталог
                        </p> */}
                    <div className="flex items-center bg-[#202231] rounded-l-[10px] w-full flex-col">
                        <div className="pr-2 pl-4 tracking-wider text-gray-300 text-[18px] flex flex-col items-start w-full">
                            {categories.map((cat: any) => (
                                <Link
                                    to={`/category/${cat.categoryID}`}
                                    key={cat.categoryID}
                                    className={`block ${activeCategoryId === cat.categoryID &&
                                        cat.subcategories.length > 0 &&
                                        "text-white"} hover:text-white cursor-pointer w-[90%] border-b py-4 border-[#2B2D41]`}
                                >
                                    <div onClick={() => toggleSub(cat.categoryID)} className="">
                                        {cat.name}
                                    </div>
                                    <AnimatePresence>
                                        {activeCategoryId === cat.categoryID && cat.subcategories.length > 0 && (
                                            <motion.div
                                                className="ml-4 flex flex-col gap-2 text-[16px] mt-2 text-gray-300"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                {cat.subcategories.map((sub: any, i: number) => (
                                                    <Link to={`/category/${sub.categoryID}`}>
                                                        <div key={i} className="hover:text-white cursor-pointer">
                                                            {sub.name}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
