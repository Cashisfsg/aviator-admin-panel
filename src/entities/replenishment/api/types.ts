export type Currency = "USD" | "RUB" | "UZS" | "KZT";

type CurrencyRecord = Record<Currency, number>;

interface Requisite {
    _id: string;
    requisite: string;
    name: string;
    currency: Currency;
    img: string;
    commission: number;
    status: string;
}

export interface Replenishment {
    _id: string;
    user: string;
    amount: CurrencyRecord;
    currency: string;
    deduction: CurrencyRecord;
    status: string;
    statusMessage: string;
    isPayConfirmed: boolean;
    requisite: Requisite;
    createdAt: string;
    completedDate: string;
}

export interface SuccessResponse {
    message: string;
}

export interface FetchAllReplenishmentsRequest {
    skip?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}

export interface CancelReplenishmentByIdRequest {
    id: string;
    statusMessage: string;
}

export interface ConfirmReplenishmentByIdRequest {
    id: string;
}
