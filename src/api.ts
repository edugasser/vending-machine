import axios from "axios"
import { ProductProps } from "./components/product";
import { UserProps } from "./components/cash";


export const api = {
    login: async (username: string): Promise<UserProps> => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/login/', {"username": username});
            return response.data
        } catch (error) {
            throw Error("Error login.")
        }
    },
    getProducts: async (): Promise<ProductProps[]> => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/slots/');
            return response.data
        } catch (error) {
            throw Error("Error get products.")
        }
    },
    add: async (username: string, amount: number): Promise<any> => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/balance/add/', {"username": username, "amount": amount});
            return response.data
        } catch (error) {
            throw Error("Error add.")
        }
    },
    refund: async (username: string): Promise<any> => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/balance/refund/', {"username": username});
            return response.data
        } catch (error) {
            throw Error("Error refund.")
        }
    },
    buy: async (username: string, id_slot: string): Promise<any> => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/buy/', {"username": username, "slot_id": id_slot});
            return response.data
        } catch (error) {
            throw Error("Error buying products.")
        }
    },
}
