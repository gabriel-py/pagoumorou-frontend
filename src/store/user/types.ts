import { UserCreated } from "@/services/api/create-user/types";
import { Plan } from "@/services/api/get-plans/types";
import { User } from "@/services/api/login/types";

export type UserStateProps = {
    isLoggedIn?: boolean;
    isLoadingLogin: boolean;
    isLoading: boolean;
    isLoadingCheckLogin: boolean;
    isLoadingProfile: boolean;
    user?: User;
    userCreated?: UserCreated;
    plans?: Plan[];
    metrics?: DropiProMetrics;
    isLoadingMetrics: boolean;
    componentsMetrics?: GetComponentsResponse;
    profile?: UserDetailResponse;
};
