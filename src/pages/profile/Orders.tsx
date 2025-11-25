import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import type { Order } from "../../features/ordersSlice";
import { fetchOrders } from "../../features/ordersSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Orders = () => {
    const [orderId, setOrderId] = useState<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector<RootState, Order[]>((state) => state.orders.orders);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/profile/orders") {
            dispatch(fetchOrders());
        }
    }, [location.pathname]);

    return (
        <div className="flex p-2 text-black/80 flex-col gap-3">
            {orders &&
                orders.map((order) => (
                    <div
                        onClick={() => setOrderId(orderId === order.id ? null : order.id)}
                        key={order.id}
                        className="p-2 rounded-xl border border-black/30  hover:bg-blue-50 cursor-pointer flex gap-10"
                    >
                        {orderId === order.id ? (
                            <>
                                <div>
                                    <p className="mb-2 text-black/50 font-medium">Имя получателя:</p>
                                    <p>{order.first_name}</p>
                                </div>
                                <div>
                                    <p className="mb-2 text-black/50 font-medium">Фамилия получателя:</p>
                                    <p>{order.last_name}</p>
                                </div>
                                <div>
                                    <p className="mb-2 text-black/50 font-medium">Город получателя:</p>
                                    <p>{order.city}</p>
                                </div>
                                <div>
                                    <p className="mb-2 text-black/50 font-medium">Номер отделения получателя:</p>
                                    <p>{order.newPost_office}</p>
                                </div>
                                <div>
                                    <p className="mb-2 text-black/50 font-medium">Способ оплаты:</p>
                                    <p>{order.payment_method}</p>
                                </div>
                                <div>
                                    <p className="mb-2 text-black/50 font-medium">Номер получателя:</p>
                                    <p>0{order.phone_number}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-3">
                                    <p className="text-[15px] font-medium">Номер заказа:</p>
                                    <p className="text-center">{order.id}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-[15px] font-medium">Код продукта и количество</p>
                                    <div className="text-center flex flex-col">
                                        {order.productID.map((p) => (
                                            <div key={p.productID} className="flex justify-between">
                                                <p className="text-black/20">
                                                    Код: <span className="text-black">{p.productID}</span>
                                                </p>
                                                <p className="text-black/30">x{p.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default Orders;
