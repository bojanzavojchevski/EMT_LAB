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