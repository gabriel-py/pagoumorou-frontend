interface CardDetails {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
    name: string;
}

export interface StartMembershipPayload {
    user_id: number;
    token: string;
}

export interface StartMembershipResponse {
    success: boolean;
    message: string;
}
