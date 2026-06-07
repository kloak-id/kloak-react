import { useAuth } from '../KloakProvider.js';
/** Hook for accessing the current user. */
export function useUser() {
    const authState = useAuth();
    return {
        user: authState.user,
        isLoading: authState.isLoading,
    };
}
//# sourceMappingURL=useUser.js.map