interface Profile {
    id: number;
    profile_photo: string | null;
    bio: string | null;
    birth_date: string | null;
    phone_number: string | null;
    address: string | null;
}

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_joined: string;
}

interface UserDetailResponse {
    user: User;
    profile: Profile;
}

