import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Order = {
    customerID: null | number;
    first_name: string;
    last_name: string;
    city: string;
    newPost_office: null | number;
    phone_number: null | number;
    payment_method: string;
    productID: number[];
};

type OrderState = {
    orders: Order[],
    loading: boolean,
    error: string | null
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null
};

export const fetchOrders = createAsyncThunk<Order[], Order>("orderSlice/fetchOrders", async () => {
    try {
        const res = await axios.get("http://localhost:3001/orders", { withCredentials: true });
        return res.data;
    } catch (err) {
        console.log(err);
    }
});

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Unknown error';
        })
    },
});

export default orderSlice.reducer;
