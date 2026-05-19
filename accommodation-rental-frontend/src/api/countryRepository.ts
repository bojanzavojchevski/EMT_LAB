import axiosInstance from "./axiosInstance";
import type {
    Country,
    CreateCountryRequest,
    UpdateCountryRequest,
} from "../types/country";

const countryRepository = {
    findAll: async (): Promise<Country[]> => {
        const response = await axiosInstance.get<Country[]>("/countries");
        return response.data;
    },

    findById: async (id: number): Promise<Country> => {
        const response = await axiosInstance.get<Country>(`/countries/${id}`);
        return response.data;
    },

    create: async (request: CreateCountryRequest): Promise<Country> => {
        const response = await axiosInstance.post<Country>("/countries", request);
        return response.data;
    },

    update: async (id: number, request: UpdateCountryRequest): Promise<Country> => {
        const response = await axiosInstance.put<Country>(`/countries/${id}`, request);
        return response.data;
    },

    deleteById: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/countries/${id}`);
    },
};

export default countryRepository;