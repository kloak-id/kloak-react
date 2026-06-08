import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { KloakClient, type KloakClientConfig } from '@kloak.id/web';
import type { User } from '@kloak.id/web';

export interface ReactAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const KloakContext = createContext<KloakClient | null>(null);

const AuthStateContext = createContext<ReactAuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

import type { Recipe } from './types/recipe.js';

export interface KloakProviderProps {
  config: KloakClientConfig;
  recipeList?: Recipe[];
  children: React.ReactNode;
}

const RecipeContext = createContext<Recipe[]>([]);

export function KloakProvider({ config, recipeList, children }: KloakProviderProps) {
  const kloak = useMemo(() => new KloakClient(config), [config.baseUrl, config.tenantId, config.useCustomDomain]);
  
  const [authState, setAuthState] = useState<ReactAuthState>(() => {
    const state = kloak.getAuthState();
    return {
      user: state.status === 'authenticated' ? state.user : null,
      isAuthenticated: kloak.isAuthenticated(),
      isLoading: state.status === 'loading',
    };
  });

  useEffect(() => {
    const unsubscribe = kloak.onAuthStateChange((state) => {
      setAuthState({
        user: state.status === 'authenticated' ? state.user : null,
        isAuthenticated: state.status === 'authenticated',
        isLoading: state.status === 'loading',
      });
    });

    return unsubscribe;
  }, [kloak]);

  return (
    <KloakContext.Provider value={kloak}>
      <AuthStateContext.Provider value={authState}>
        <RecipeContext.Provider value={recipeList || []}>
          {children}
        </RecipeContext.Provider>
      </AuthStateContext.Provider>
    </KloakContext.Provider>
  );
}

export function useKloak(): KloakClient {
  const context = useContext(KloakContext);
  if (!context) {
    throw new Error('useKloak must be used within a KloakProvider');
  }
  return context;
}

export function useAuth(): ReactAuthState {
  const context = useContext(AuthStateContext);
  return context;
}

export function useRecipeList(): Recipe[] {
  return useContext(RecipeContext);
}

export interface UseSessionResult {
  sessionId: string | null;
  signOut: () => Promise<void>;
}

export function useSession(): UseSessionResult {
  const client = useKloak();
  const authState = useAuth();
  return {
    sessionId: authState.isAuthenticated ? 'active' : null,
    signOut: () => client.signOut(),
  };
}

export interface UseUserResult {
  user: User | null;
  isLoading: boolean;
}

export function useUser(): UseUserResult {
  const authState = useAuth();
  return {
    user: authState.user,
    isLoading: authState.isLoading,
  };
}

export function useAuthState(): ReactAuthState {
  return useAuth();
}
