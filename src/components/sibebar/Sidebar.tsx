import Logo from "../../icons/logo-head.png";
import Home from "../../icons/home.svg?react";
import Call from "../../icons/call.svg?react";
import About from "../../icons/about.svg?react";

interface CategoriesProp {
    categories: any;
}

const Sidebar: React.FC<CategoriesProp> = ({ categories }) => {
    return (
        <div className="flex flex-col px-2 py-4 bg-[#2B2D41] min-w-[320px]">
            <div className="flex px-8 mb-5 justify-center items-center">
                <img src={Logo} className="w-[90%]" alt="" />
            </div>
            <div className="flex">
                <div className="flex mt-10 self-center gap-5 flex-col">
                    <Home />
                    <Call />
                    <About />
                </div>
                <div className="flex items-center w-full flex-col">
                    <p className="text-[30px] text-[#dfdfdf]">Каталог</p>
                    {categories.map((cat:any) => (
                        <div>{cat.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
