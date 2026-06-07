import React from 'react';
import { KloakClient, type KloakClientConfig } from '@kloak.id/web';
import type { User } from '@kloak.id/web';
export interface ReactAuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
import type { Recipe } from './types/recipe.js';
export interface KloakProviderProps {
    config: KloakClientConfig;
    recipeList?: Recipe[];
    children: React.ReactNode;
}
export declare function KloakProvider({ config, recipeList, children }: KloakProviderProps): React.JSX.Element;
export declare function useKloak(): KloakClient;
export declare function useAuth(): ReactAuthState;
export declare function useRecipeList(): Recipe[];
export interface UseSessionResult {
    sessionId: string | null;
    signOut: () => Promise<void>;
}
export declare function useSession(): UseSessionResult;
export interface UseUserResult {
    user: User | null;
    isLoading: boolean;
}
export declare function useUser(): UseUserResult;
export declare function useAuthState(): ReactAuthState;
//# sourceMappingURL=KloakProvider.d.ts.map