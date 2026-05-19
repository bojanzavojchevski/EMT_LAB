import axiosInstance from "./axiosInstance";
import type {
    CreateHostRequest,
    Host,
    UpdateHostRequest,
} from "../types/host";

const hostRepository = {
    findAll: async (): Promise<Host[]> => {
        const response = await axiosInstance.get<Host[]>("/hosts");
        return response.data;
    },

    findById: async (id: number): Promise<Host> => {
        const response = await axiosInstance.get<Host>(`/hosts/${id}`);
        return response.data;
    },

    create: async (request: CreateHostRequest): Promise<Host> => {
        const response = await axiosInstance.post<Host>("/hosts", request);
        return response.data;
    },

    update: async (id: number, request: UpdateHostRequest): Promise<Host> => {
        const response = await axiosInstance.put<Host>(`/hosts/${id}`, request);
        return response.data;
    },

    deleteById: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/hosts/${id}`);
    },
};

export default hostRepository;