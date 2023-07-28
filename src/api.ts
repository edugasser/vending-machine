import axios from "axios"
import { ProductProps } from "./components/product";


export const api = {
    getProducts: async (): Promise<ProductProps[]> => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/products');
            return response.data
        } catch (error) {
            throw Error("Error get products.")
        }
    },

}
