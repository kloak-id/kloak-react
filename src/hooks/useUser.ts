import type { User } from '@kloak.id/web';
import { useAuth } from '../KloakProvider.js';

export interface UseUserResult {
  user: User | null;
  isLoading: boolean;
}

/** Hook for accessing the current user. */
export function useUser(): UseUserResult {
  const authState = useAuth();

  return {
    user: authState.user,
    isLoading: authState.isLoading,
  };
}
