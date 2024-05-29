import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {useAuthStore} from '@/store/Store';

const useRenewTokenOnRouteChange = () => {
    const location = useLocation();
    const { accessToken, renewToken } = useAuthStore((state) => ({
        accessToken: state.accessToken,
        renewToken: state.renewToken,
    }));

    useEffect(() => {
        const isTokenExpiringSoon = () => {
            if (!accessToken) return true;
            const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
            const expiryTime = tokenPayload.exp * 1000;
            const currentTime = Date.now();
            return expiryTime - currentTime < 5 * 60 * 1000; // 5 minutes
        };

        const renew = async () => {
            if (isTokenExpiringSoon()) {
                await renewToken();
            }
        };

        renew();
    }, [location, renewToken, accessToken]);
};

export default useRenewTokenOnRouteChange;
