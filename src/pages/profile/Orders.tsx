import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import type {Order } from "../../features/ordersSlice";
import { fetchOrders } from "../../features/ordersSlice";
import { useEffect } from "react";
import { useLocation } from "react-router";

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector<RootState, Order[]>((state) => state.orders.orders);
    const location = useLocation()
    useEffect(() => {
        if(location.pathname === '/profile/orders'){

            dispatch(fetchOrders());
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col gap-3">
            {orders && orders.map((order) => (
                <div>{order.id}</div>
            ))}
        </div>
    ) 
};

export default Orders;
