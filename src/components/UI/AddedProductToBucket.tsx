import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useEffect, useState } from "react";
interface BucketProps {
    show: boolean;
}

const AddedProductToBucket: React.FC<BucketProps> = memo(({ show }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=> {
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 2000);
    }, [show])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key={"modal"}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "50%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" absolute right-0 top-0  left-0 flex justify-center items-center"
                >
                    <div className="rounded-xl bg-gray-500 px-5 border-2 border-slate-400 py-1">
                        <p className="text-[15px] text-white">Товар добавлен в корзину</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

export default AddedProductToBucket;
