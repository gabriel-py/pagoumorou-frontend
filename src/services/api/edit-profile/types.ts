export interface UserProfileUpdatePayload {
    full_name: string;
    email: string;
    password: string;
    profile: {
      phone_number: string;
      bio?: string;
      address?: string;
      profile_photo?: string;
    };
}

export interface UserProfileUpdateResponse {
    user: {
      first_name: string;
      last_name: string;
      email: string;
    };
    profile: {
      phone_number: string;
      bio?: string;
      address?: string;
    };
    success: boolean;
}
  
  
