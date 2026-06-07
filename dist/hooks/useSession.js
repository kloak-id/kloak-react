import { useKloak, useAuth } from '../KloakProvider.js';
/** Returns the current session ID and a signOut helper. */
export function useSession() {
    const client = useKloak();
    const authState = useAuth();
    return {
        sessionId: authState.isAuthenticated ? 'active' : null,
        signOut: () => client.signOut(),
    };
}
//# sourceMappingURL=useSession.js.map