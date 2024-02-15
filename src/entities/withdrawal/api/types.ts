export interface Withdrawal {
    _id: string;
    user: string;
    amount: number;
    currency: string;
    status: string;
    statusMessage: string;
    userRequisite: string;
    requisite: Requisite;
    createdAt: string;
    completedDate: string;
}

export interface Requisite {
    _id: string;
    requisite: string;
    name: string;
    currency: string;
    img: string;
    commission: number;
    active: boolean;
    balance: number;
}

export interface FetchAllWithdrawalsRequest {
    skip?: number;
    limit?: number;
    stateDate?: string;
    endDate?: string;
}
