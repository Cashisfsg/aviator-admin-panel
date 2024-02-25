export type Currency = "USD" | "RUB" | "UZS" | "KZT";

export interface Requisite {
    _id: string;
    requisite: string;
    name: string;
    currency: Currency;
    img: string;
    commission: number;
    active: boolean;
    balance: number;
}

export interface User {
    _id: string;
    login: string;
    replenishmentBonus: number;
    withdrawalBonus: number;
    balance: number;
    requisite: Requisite;
}
