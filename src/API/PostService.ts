import axios from "axios";

export default class PostService {
    static async getAllProducts(limit?: number, offset?: number) {
        const response = await axios.get("http://localhost:3001/api/prodicts/catalog/", {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getAllCategories() {
        const response = await axios.get("https://backend-auto-7uaq.onrender.com/api/category/");
        return response;
    }
    static async getCategoryByProduct(id: string, limit?: number, offset?: number) {
        const response = await axios.get(`https://backend-auto-7uaq.onrender.com/api/products/category/${id}`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getProductByID(id: string) {
        const response = await axios.get("https://backend-auto-7uaq.onrender.com/api/products/product/" + id);
        return response;
    }

    static async getAllSaleProducts(limit?: number, offset?: number) {
        const response = await axios.get("https://backend-auto-7uaq.onrender.com/api/products/", {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
}
