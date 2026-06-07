import { useAuth } from '../KloakProvider.js';
import type { ReactAuthState } from '../KloakProvider.js';

/** Returns the full AuthState — useful for granular loading/error handling. */
export function useAuthState(): ReactAuthState {
  return useAuth();
}
