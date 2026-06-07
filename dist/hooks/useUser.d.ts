import type { User } from '@kloak.id/web';
export interface UseUserResult {
    user: User | null;
    isLoading: boolean;
}
/** Hook for accessing the current user. */
export declare function useUser(): UseUserResult;
//# sourceMappingURL=useUser.d.ts.map