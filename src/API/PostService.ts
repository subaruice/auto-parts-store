import axios from "axios";

export default class PostService {
    static async deleteProductById(id: number) {
        const response = await axios.delete(`http://localhost:3001/admin/delete/${id}`, { withCredentials: true });
        return response;
    }
    static async addNewProduct(data:any) {
        const response = await axios.put(`http://localhost:3001/admin/add-product`, data, { withCredentials: true });
        return response;
    }
    static async getAllProducts(limit?: number, offset?: number) {
        const response = await axios.get("http://localhost:3001/api/products/catalog/", {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getAllCategories() {
        const response = await axios.get("http://localhost:3001/api/category/");
        return response;
    }
    static async getCategoryByProduct(id: number, limit?: number, offset?: number) {
        const response = await axios.get(`http://localhost:3001/api/products/category/${id}`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
    static async getProductByID(id: string) {
        const response = await axios.get("http://localhost:3001/api/products/product/" + id);
        return response;
    }

    static async getAllSaleProducts(limit?: number, offset?: number) {
        const response = await axios.get("http://localhost:3001/api/products/", {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
        });
        return response;
    }
}
