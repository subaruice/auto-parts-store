import axios from "axios";

export default class PostService {
    static async deleteProductById(id: number) {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL_DEV}/admin/delete/${id}`, { withCredentials: true });
        return response;
    }
    static async addNewProduct(data:any) {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL_DEV}/admin/add-product`, data, { withCredentials: true });
        return response;
    }
    static async getAllProducts(limit?: number, offset?: number) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DEV}/api/products/catalog/`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getAllCategories() {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DEV}/api/category/`);
        return response;
    }
    static async getCategoryByProduct(id: number, limit?: number, offset?: number) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DEV}/api/products/category/${id}`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getProductByID(id: string) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DEV}/api/products/product/` + id);
        return response;
    }

    static async getAllSaleProducts(limit?: number, offset?: number) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_DEV}/api/products/`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
}
