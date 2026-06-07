import { useKloak, useAuth } from '../KloakProvider.js';

export interface UseSessionResult {
  sessionId: string | null;
  signOut: () => Promise<void>;
}

/** Returns the current session ID and a signOut helper. */
export function useSession(): UseSessionResult {
  const client = useKloak();
  const authState = useAuth();

  return {
    sessionId: authState.isAuthenticated ? 'active' : null,
    signOut: () => client.signOut(),
  };
}
