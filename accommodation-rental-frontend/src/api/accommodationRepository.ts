import axiosInstance from "./axiosInstance";
import type {
    Accommodation,
    CreateAccommodationRequest,
    UpdateAccommodationRequest,
} from "../types/accommodation";

const accommodationRepository = {
    findAll: async (): Promise<Accommodation[]> => {
        const response = await axiosInstance.get<Accommodation[]>("/accommodations");
        return response.data;
    },

    findById: async (id: number): Promise<Accommodation> => {
        const response = await axiosInstance.get<Accommodation>(`/accommodations/${id}`);
        return response.data;
    },

    create: async (request: CreateAccommodationRequest): Promise<Accommodation> => {
        const response = await axiosInstance.post<Accommodation>("/accommodations", request);
        return response.data;
    },

    update: async (
        id: number,
        request: UpdateAccommodationRequest
    ): Promise<Accommodation> => {
        const response = await axiosInstance.put<Accommodation>(
            `/accommodations/${id}`,
            request
        );

        return response.data;
    },

    deleteById: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/accommodations/${id}`);
    },
};

export default accommodationRepository;