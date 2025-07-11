
const Bucket = () => {
    const products = JSON.parse(localStorage.getItem("products") ?? '[]')
    return (
       <div className="p-4 w-full h-full">
            <div className="rounded-[10px] bg-white w-full h-full">
                <div className="flex flex-col gap-4">
                    {products.map((product:any) => (
                        <div className="flex">
                            <div>{product.name}</div>
                            <div>{product.Price}</div>
                        </div>
                    ))}
                </div>
            </div>
       </div>
    );
};

export default Bucket ;