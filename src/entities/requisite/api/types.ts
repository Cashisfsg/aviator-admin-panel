export interface Requisite {
    _id: string;
    requisite: string;
    name: string;
    currency: string;
    img: string;
    commission: number;
    active: boolean;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

export interface AddRequisiteRequest {
    requisite: string;
}
