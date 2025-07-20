import { useState, memo, useRef, useEffect } from "react";
import { Link } from "react-router";

const imageSources = [
    { src: "Obr-1.png", categoryID: "148" },
    { src: "Obr-2.png", categoryID: "158" },
    { src: "Obr-3.png", categoryID: "162" },
    { src: "Obr-4.png", categoryID: "162" },
    { src: "Obr-5.png", categoryID: "154" },
    { src: "Obr-6.png", categoryID: "154" },
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
        <div className="gap-3 flex flex-col justify-center">
            <Link className="flex justify-center" to={`/category/${current.categoryID}`}>
                <img src={`https://www.milotec.net/fotky72500/slider/${current.src}`} alt="no image" />
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
    );
});

export default SliderHomepage;
