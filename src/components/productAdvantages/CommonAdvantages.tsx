const CommonAdvantages = () => {
    return (
        <div className="w-full flex gap-3 mt-5">
            <div className="flex-1/3 pr-3">
                <div className="flex gap-2">
                    <img className="self-start w-max-[68px] object-contain" src="/common-adventure-1.png" alt="" />
                    <p>
                        <span className="font-medium text-[16px]">Чешская традиция качества <br/></span>26+ лет на рынке,
                        производство только из прочных материалов
                    </p>
                </div>
            </div>
            <div className="flex-1/3 pr-3">
                <div className="flex gap-2">
                    <img className="self-start w-max-[68px] object-contain" src="/common-adventure-2.png" alt="" />
                    <p>
                        <span className="font-medium text-[16px]">Огромный асортимент Skoda <br/></span>
                        Собственное производство автоаксессуаров для автомобилей Škoda.
                    </p>
                </div>
            </div>
            <div className="flex-1/3">
                <div className="flex gap-2">
                    <img className="self-start w-max-[68px] object-contain" src="/common-adventure-3.png" alt="" />
                    <p>
                        <span className="font-medium text-[16px]">ЕС Сертификаты <br/></span>
                        Вся продукция соответствует нормам и директивам ЕС.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommonAdvantages;
