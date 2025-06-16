import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import styles from './styles.module.scss';
import { NewUserFormData } from '../..';
import { useAppDispatch } from '@/store';
import { createUser } from '@/store/services';

interface IAccountCreationOptionsProps {
    onNextStep: () => void;
    onPrevious: () => void;
}

export interface GoogleUserInfo {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    hd: string;
}

const AccountCreationOptions = ({ onNextStep, onPrevious }: IAccountCreationOptionsProps) => {
    const dispatch = useAppDispatch();

    const handleSuccess = async (response: any) => {
        console.log(response);
        const getUserInfo = async (accessToken: string) => {
            try {
                const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                return await response.json();
            } catch (error) {
                console.error('Error fetching user info:', error);
                return null;
            }
        };

        const accessToken = response?.access_token;
        if (accessToken) {
            const userInfo = await getUserInfo(accessToken);
            if (userInfo) {
                const payload: NewUserFormData = {
                    email: userInfo.email,
                    name: `${userInfo.given_name} ${userInfo.family_name}`,
                };

                console.log(payload);
                dispatch(createUser(payload)).then(()=>{
                    window.location.href = '/home';
                });
            }
        }
    };

    const login = useGoogleLogin({
        onSuccess: handleSuccess,
        onError: () => console.error('Login Failed'),
    });

    return (
        <div className={styles.container}>
            <GoogleOAuthProvider clientId="1013079086725-2uh2343ta3d9hq0kqbrtfep797oo7uue.apps.googleusercontent.com">
                <button type='button' className={styles.google} onClick={() => login()}>
                    <img src='/google2.webp' alt="Google Icon" />
                    <span>Criar conta com Conta Google</span>
                </button>
            </GoogleOAuthProvider>
            <div className={styles.dividerSection}>
                <div className={styles.divider}></div>
                <span>ou</span>
                <div className={styles.divider}></div>
            </div>
            <button type='button' className={styles.createAccount} onClick={onNextStep}>
                <span>Criar conta com e-mail</span>
            </button>
        </div>
    );
};

export default AccountCreationOptions;
