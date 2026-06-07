import { useAuth as useAuthFromProvider } from '../KloakProvider.js';
import type { ReactAuthState } from '../KloakProvider.js';

export function useAuth(): ReactAuthState {
  return useAuthFromProvider();
}
