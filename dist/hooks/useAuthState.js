import { useAuth } from '../KloakProvider.js';
/** Returns the full AuthState — useful for granular loading/error handling. */
export function useAuthState() {
    return useAuth();
}
//# sourceMappingURL=useAuthState.js.map