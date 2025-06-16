export interface User {
    username: string;
    is_superuser: boolean;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    first_name: string;
    last_name: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    error?: string;
    success: boolean;
    session: string;
    user: User;
}