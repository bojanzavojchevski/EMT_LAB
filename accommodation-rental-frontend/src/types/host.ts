import type { Country } from "./country";

export interface Host {
    id: number;
    name: string;
    surname?: string;
    fullName?: string;
    country?: Country;
}