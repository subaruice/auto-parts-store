// import Logo from "../../icons/logo-head.png";
// import Home from "../../icons/home.svg?react";
// import Call from "../../icons/call.svg?react";
// import About from "../../icons/about.svg?react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { memo } from "react";

interface CategoriesProp {
    categories: any;
    categoryID?: string | undefined;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMobile: React.FC<CategoriesProp> = memo(({ categories, categoryID, setSidebar }) => {
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>();
    const [activeSubCategoryId, setActiveSubCategoryId] = useState<number | null>();
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    const toggleSub = (id: number) => {
        setActiveCategoryId((prev) => (prev === id ? null : id));
        setActiveSubCategoryId(null);
        setSidebar(false);
    };
    const toggleSubActive = (id: number) => {
        setActiveSubCategoryId((prev) => (prev === id ? null : id));
    };

    // const clearStates = () => {
    //     setActiveCategoryId(null);
    //     setActiveSubCategoryId(null);
    // };

    useEffect(() => {
        if (activeCategoryId == null && categoryID && categories.length > 0) {
            const numericCategoryID = Number(categoryID);

            let found = categories.find((cat: any) => cat.categoryID === numericCategoryID);
            if (!found) {
                // ищем во вложенных подкатегориях
                categories.forEach((cat: any) => {
                    const sub = cat.subcategories?.find((subcat: any) => subcat.categoryID === numericCategoryID);
                    if (sub) {
                        found = { ...sub, parent: cat.categoryID }; // добавляем родителя вручную
                    }
                });
            }
            if (found.parent === 1) {
                setActiveCategoryId(Number(categoryID));
            } else if (found.parent !== 1) {
                setActiveSubCategoryId(Number(categoryID));
                setActiveCategoryId(Number(found.parent));
            }
        }
    }, [categoryID, categories]);

    return (
        <div onClick={(e) => e.stopPropagation()} className="grow h-full flex flex-col  shrink-0 w-[90%]">
            <div className="flex grow text-gray-200 text-[22px] bg-[#2f3247] flex-col">
                {/* <div className="flex mt-15 self-start gap-5 flex-col">
                    <Link onClick={clearStates} className="cursor-pointer" to={"/"}>
                        <Home className="hover:stroke-white" />
                    </Link>
                    <Link to={"/contacts"}>
                        <Call className="hover:stroke-white" />
                    </Link>
                    <Link to={"/about"}>
                        <About className="hover:stroke-white" />
                    </Link>
                </div> */}
                <div className="border-b border-gray-700 pl-4 pr-2 py-7">Главная</div>
                <div className="border-b border-gray-700 pr-2">
                    <div
                        className={`${isCatalogOpen && "text-white"} indent-4 py-7`}
                        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    >
                        Каталог
                    </div>
                    <AnimatePresence mode="wait">
                    {isCatalogOpen && (
                            <motion.div 
                            initial={{scaleY: 0, transformOrigin: 'top'}}
                            animate={{scaleY: 1}}
                            exit={{scaleY: 0}}
                            transition={{duration: 0.2}}
                            className="w-full pl-2">
                                <div className="flex rounded items-center bg-[#202231] w-full flex-col">
                                    <div className="pr-2 pl-4 tracking-wider text-gray-300 text-[18px] flex flex-col items-start w-full">
                                        {categories.map((cat: any) => (
                                            <div
                                                key={cat.categoryID}
                                                className={`${
                                                    activeCategoryId === cat.categoryID && "text-white"
                                                } hover:text-white cursor-pointer w-[90%] border-b py-4 border-[#2B2D41]`}
                                            >
                                                <Link
                                                    to={`/category/${cat.categoryID}`}
                                                    onClick={() => toggleSub(cat.categoryID)}
                                                    className="w-full"
                                                >
                                                    {cat.name}
                                                </Link>

                                                {activeCategoryId === cat.categoryID &&
                                                    cat.subcategories.length > 0 && (
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
                                                                        className={`${
                                                                            activeSubCategoryId === sub.categoryID &&
                                                                            "text-white"
                                                                        } hover:text-white cursor-pointer`}
                                                                    >
                                                                        {sub.name}
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                <div className="border-b border-gray-700 pl-4 pr-2 py-7">Контакты</div>
                <div className="border-b border-gray-700 pl-4 pr-2 py-7">О нас</div>
            </div>
        </div>
    );
});

export default SidebarMobile;
