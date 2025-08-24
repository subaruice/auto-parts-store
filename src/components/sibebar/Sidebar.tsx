import Logo from "../../icons/logo-head.png";
import Home from "../../icons/home.svg?react";
import Call from "../../icons/call.svg?react";
import About from "../../icons/about.svg?react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { memo } from "react";

interface CategoriesProp {
    categories: any;
    categoryID?: string | undefined;
}

const Sidebar: React.FC<CategoriesProp> = memo(({ categories, categoryID }) => {
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>();
    const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>();

    const toggleSub = (id: number) => {
        setActiveCategoryId((prev) => (prev === id ? null : id));
        setActiveSubCategoryId(null);
    };
    const toggleSubActive = (id: number) => {
        setActiveSubCategoryId((prev) => (prev === id ? null : id));
    };

    const clearStates = () => {
        setActiveCategoryId(null);
        setActiveSubCategoryId(null);
    };

    useEffect(() => {
        if (activeCategoryId == null && categoryID && categories.length > 0) {
            const numericCategoryID = Number(categoryID);

            let found = categories.find((cat: any) => cat.categoryID === numericCategoryID);
            if (!found) {
                categories.forEach((cat: any) => {
                    const sub = cat.subcategories?.find((subcat: any) => subcat.categoryID === numericCategoryID);
                    if (sub) {
                        found = { ...sub, parent: cat.categoryID }; 
                    }
                });
            }
            if (found?.parent === 1) {
                setActiveCategoryId(Number(categoryID));
            } else if (found?.parent !== 1) {
                setActiveSubCategoryId(Number(categoryID));
                setActiveCategoryId(Number(found?.parent));
            }
        }
    }, [categoryID, categories]);

    return (
        <div className="flex flex-col pl-2 py-4 bg-[#2B2D41] shrink-0 w-[320px]">
            <Link onClick={clearStates} to={"/"} className="flex px-8 mb-2 justify-center items-center">
                <img src={Logo} className="w-[90%]" alt="logo-image" />
            </Link>
            <div className="flex">
                <div className="flex mt-15 self-start gap-5 flex-col">
                    <Link onClick={clearStates} className="cursor-pointer" to={"/"}>
                        <Home className="hover:stroke-white" />
                    </Link>
                    <Link to={"/contacts"}>
                        <Call className="hover:stroke-white" />
                    </Link>
                    <Link to={"/about"}>
                        <About className="hover:stroke-white" />
                    </Link>
                </div>
                <div className="w-full pl-4">
                    <div className="flex items-center bg-[#202231] rounded-l-[10px] w-full flex-col">
                        <div className="tracking-wider text-gray-300 text-[18px] flex flex-col items-start w-full">
                            {categories.map((cat: any) => (
                                <div
                                    key={cat.categoryID}
                                    className={`${activeCategoryId === cat.categoryID &&
                                        "text-white"} hover:text-white cursor-pointer w-[100%] border-b  border-[#2B2D41]`}
                                >
                                    <Link
                                        to={`/category/${cat.categoryID}`}
                                        onClick={() => toggleSub(cat.categoryID)}
                                        className="block w-full pr-2 pl-4 py-4 h-full"
                                    >
                                        {cat.name}
                                    </Link>
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
                                                    <Link
                                                        key={i}
                                                        onClick={() => toggleSubActive(sub.categoryID)}
                                                        to={`/category/${sub.categoryID}`}
                                                    >
                                                        <div
                                                            className={`${activeSubCategoryId === sub.categoryID &&
                                                                "text-white"} hover:text-white cursor-pointer`}
                                                        >
                                                            {sub.name}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Sidebar;
