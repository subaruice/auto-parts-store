const About = () => {
    return (
        <div className="p-2 sm:p-4">
            <div className=" rounded-lg bg-white p-2 sm:p-4 text-[18px] text-black/70 leading-relaxed space-y-3 sm:space-y-6">
                <p className="font-bold text-center text-[20px]">О продукции</p>
                <div>
                    <img
                        src="about-us.png"
                        alt="Skoda"
                        className="float-left w-100 mr-4 mb-5 sm:mb-10 rounded shadow"
                    />
                    <p className="text-[21px] text-center tracking-wider font-semibold mb-2 text-[#303c66]">
                        Качество за разумную цену <br />Любовь к марке Skoda
                    </p>
                    <p className="mb-5 sm:mb-10">
                        Это не только фразы, но и факт, который влияет на все наши стремления при разработке,
                        тестировании, производстве и дальнейшей продаже аксессуаров для тюнинга автомобилей марки Skoda.
                    </p>
                    <p>
                        Фирма Milotec Auto-Extras использует при производстве аксессуаров только высококачественные
                        материалы. Сверхлегкий алюминий, прочный и выносливый ABS-пластик и нержавеющая сталь – всё это
                        в эксклюзивном дизайне. Изделия изготовлены в самом высоком качестве, согласно нормам DIN EN ISO
                        9001, одобрены протоколами 8SD, ABE и TUV.
                    </p>
                    <div className="clear-left"></div>
                </div>

                <div className="border-b pb-6 border-black/30">
                    <img src="about-us.jpg" alt="Фирма" className="float-right w-100 ml-4 mb-2 rounded shadow" />
                    <p>
                        Вся поставляемая продукция имеет сертификаты качества и прошла тестирование в реальных условиях
                        эксплуатации. Фирма-производитель также имеет сертификат, разрешающий выпуск автоаксессуаров.
                    </p>
                    <div className="clear-right"></div>
                </div>
                <div>
                    <p className="text-center text-wrap font-bold text-black/70 mb-2">
                        Официальный и единственный представитель компании Milotec в Украине
                    </p>
                    <img src="certifikat_gb.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;
