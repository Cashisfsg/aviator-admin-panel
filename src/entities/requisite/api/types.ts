export interface Requisite {
    _id: string;
    requisite: string;
    active: boolean;
    currency: string;
    turnover: Turnover;
    createdAt: string;
    updatedAt: string;
}

export interface Turnover {
    confirmedCount: number;
    confirmed: number;
    inProcess: number;
}

export interface AddRequisiteRequest {
    requisite: string;
}

export interface ToggleRequisiteStatusRequest {
    id: string;
}
