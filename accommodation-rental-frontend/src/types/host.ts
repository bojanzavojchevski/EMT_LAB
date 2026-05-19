import type { Country } from "./country";

export interface Host {
    id: number;
    name: string;
    surname?: string;
    fullName?: string;
    country?: Country;
}

export interface CreateHostRequest {
    name: string;
    surname: string;
    countryId: number;
}

export interface UpdateHostRequest {
    name: string;
    surname: string;
    countryId: number;
}