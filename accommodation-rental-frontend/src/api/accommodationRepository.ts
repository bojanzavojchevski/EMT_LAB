import axiosInstance from "./axiosInstance";
import type { Accommodation } from "../types/accommodation";

const accommodationRepository = {
    findAll: async (): Promise<Accommodation[]> => {
        const response = await axiosInstance.get<Accommodation[]>("/accommodations");
        return response.data;
    },

    findById: async (id: number): Promise<Accommodation> => {
        const response = await axiosInstance.get<Accommodation>(`/accommodations/${id}`);
        return response.data;
    },
};

export default accommodationRepository;