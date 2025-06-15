import axios from 'axios';

export default class PostService {
    static async getAllProducts() {
        const response = await axios.get('http://localhost:3001/api/products/')
        return response;
    }
    static async getAllCategories() {
        const response = await axios.get('http://localhost:3001/api/category/')
        return response;
    }
    static async getCategoryByProduct(id: string) {
        const response = await axios.get('http://localhost:3001/api/products/category/' + id)
        return response;
    }
}