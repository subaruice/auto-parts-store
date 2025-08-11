import { AnimatePresence, motion } from "framer-motion";
import { useState, memo, useRef, useEffect } from "react";
import { Link } from "react-router";

const imageSources = [
    { src: "sliderIMG/slider1.png", categoryID: "148" },
    { src: "sliderIMG/slider2.png", categoryID: "158" },
    { src: "sliderIMG/slider3.png", categoryID: "162" },
    { src: "sliderIMG/slider4.png", categoryID: "162" },
    { src: "sliderIMG/slider5.png", categoryID: "154" },
    { src: "sliderIMG/slider6.png", categoryID: "154" },
];

const SliderHomepage = memo(() => {
    const [current, setCurrent] = useState(imageSources[0]);
    const intervalRef = useRef<number | null>(null);
    const currentChanging = () => {
        let i = 1;
        intervalRef.current = setInterval(() => {
            setCurrent(imageSources[i]);
            i = (i + 1) % imageSources.length;
        }, 5000);
    };

    const cancel = (id: any) => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        setCurrent(id);
    };

    useEffect(() => {
        currentChanging();
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    return (
        <AnimatePresence mode="popLayout">
        <div className="gap-3 flex flex-col justify-center">
            <Link className="flex justify-center" to={`/category/${current.categoryID}`}>
                <motion.img
                key={current.src} 
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration: 2}}
                src={current.src} alt="no image" />
            </Link>
            <div className="flex gap-2 justify-center">
                {imageSources.map((_, i) => (
                    <div
                        key={i}
                        className={`${imageSources[i].src === current.src &&
                            "bg-gray-700"} h-4 w-4 cursor-pointer rounded-full bg-gray-400`}
                        onClick={() => cancel(imageSources[i])}
                    ></div>
                ))}
            </div>
        </div>
        </AnimatePresence>
    );
});

export default SliderHomepage;
