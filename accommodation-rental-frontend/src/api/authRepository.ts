import axiosInstance from "./axiosInstance";
import type {
    AuthenticationResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth";

const authRepository = {
    register: async (request: RegisterRequest): Promise<AuthenticationResponse> => {
        const response = await axiosInstance.post<AuthenticationResponse>(
            "/auth/register",
            request
        );

        return response.data;
    },

    login: async (request: LoginRequest): Promise<AuthenticationResponse> => {
        const response = await axiosInstance.post<AuthenticationResponse>(
            "/auth/login",
            request
        );

        return response.data;
    },
};

export default authRepository;