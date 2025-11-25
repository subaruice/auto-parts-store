import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "./../API/PostService";
import type { Product } from "./../types/product";
import type { Category } from "../types/category";

interface InitialState {
    loading: boolean;
    error: null | string;
    products: Product[] | [];
    categories: Category[] | [];
}

const initialState: InitialState = {
    loading: false,
    error: null,
    products: [],
    categories: [],
};

export const deleteProductById = createAsyncThunk(
    "adminSlice/deleteProductById",
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await PostService.deleteProductById(id);
            return res.data;
        } catch (err: any) {
            console.log(err);
            return rejectWithValue(err.response?.data || "Ошибка запроса");
        }
    }
);

export const addNewProduct = createAsyncThunk("adminSlice/addNewProduct", async (data, { rejectWithValue }) => {
    try {
        const res = await PostService.addNewProduct(data);
        return res.data;
    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response?.data || "Ошибка запроса");
    }
});

export const fetchProducts = createAsyncThunk("adminSlice/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const res = await PostService.getAllProducts(1000);
        return res.data;
    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response?.data || "Ошибка запроса");
    }
});

export const fetchCategories = createAsyncThunk("adminSlice/fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const res = await PostService.getAllCategories();
        return res.data;
    } catch (err: any) {
        console.log(err);
        return rejectWithValue(err.response?.data || "Ошибка запроса");
    }
});

const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            const updated = action.payload;
            const id = state.products.findIndex((p) => p.productID === updated.productID);
            if (id !== -1) {
                state.products[id] = { ...state.products[id], ...updated };
            }
        },
        changeByCategoryProduct: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Unknown error";
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.products = state.products.filter((p) => p.productID !== action.payload);
        });
        builder.addCase(addNewProduct.fulfilled, (state, action) => {
            state.products = [...state.products, action.payload];
        });
    },
});

export const { changeByCategoryProduct, updateProduct } = adminSlice.actions;
export default adminSlice.reducer;
