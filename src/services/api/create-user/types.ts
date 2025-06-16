export interface CreateUserResponse {
    success: boolean;
    user: UserCreated;
}
export interface UserCreated {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}
