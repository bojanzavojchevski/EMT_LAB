import type { Host } from "./host";

export interface Accommodation {
    id: number;
    name: string;
    category: string;
    numRooms: number;
    condition?: string;
    host?: Host;
    hostFullName?: string;
    hostCountry?: string;
}

export interface CreateAccommodationRequest {
    name: string;
    category: string;
    hostId: number;
    numRooms: number;
    condition: string;
}

export interface UpdateAccommodationRequest {
    name: string;
    category: string;
    hostId: number;
    numRooms: number;
    condition: string;
}