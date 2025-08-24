import axios from "axios";

export default class PostService {
    static async getAllProducts(limit?: number, offset?: number) {
        const response = await axios.get("https://backend-auto-production.up.railway.app/api/products/catalog/", {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getAllCategories() {
        const response = await axios.get("https://backend-auto-production.up.railway.app/api/category/");
        return response;
    }
    static async getCategoryByProduct(id: string, limit?: number, offset?: number) {
        const response = await axios.get(`https://backend-auto-production.up.railway.app/api/products/category/${id}`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getProductByID(id: string) {
        const response = await axios.get("https://backend-auto-production.up.railway.app/api/products/product/" + id);
        return response;
    }

    static async getAllSaleProducts(limit?: number, offset?: number) {
        const response = await axios.get("https://backend-auto-production.up.railway.app/api/products/", {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
}
