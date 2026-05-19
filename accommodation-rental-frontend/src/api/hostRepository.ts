import axiosInstance from "./axiosInstance";
import type { Host } from "../types/host";

const hostRepository = {
    findAll: async (): Promise<Host[]> => {
        const response = await axiosInstance.get<Host[]>("/hosts");
        return response.data;
    },

    findById: async (id: number): Promise<Host> => {
        const response = await axiosInstance.get<Host>(`/hosts/${id}`);
        return response.data;
    },
};

export default hostRepository;