import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { KloakClient } from '@kloak.id/web';
const KloakContext = createContext(null);
const AuthStateContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: true,
});
const RecipeContext = createContext([]);
export function KloakProvider({ config, recipeList, children }) {
    const kloak = useMemo(() => new KloakClient(config), [config.baseUrl, config.tenantId]);
    const [authState, setAuthState] = useState(() => {
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
    return (_jsx(KloakContext.Provider, { value: kloak, children: _jsx(AuthStateContext.Provider, { value: authState, children: _jsx(RecipeContext.Provider, { value: recipeList || [], children: children }) }) }));
}
export function useKloak() {
    const context = useContext(KloakContext);
    if (!context) {
        throw new Error('useKloak must be used within a KloakProvider');
    }
    return context;
}
export function useAuth() {
    const context = useContext(AuthStateContext);
    return context;
}
export function useRecipeList() {
    return useContext(RecipeContext);
}
export function useSession() {
    const client = useKloak();
    const authState = useAuth();
    return {
        sessionId: authState.isAuthenticated ? 'active' : null,
        signOut: () => client.signOut(),
    };
}
export function useUser() {
    const authState = useAuth();
    return {
        user: authState.user,
        isLoading: authState.isLoading,
    };
}
export function useAuthState() {
    return useAuth();
}
//# sourceMappingURL=KloakProvider.js.map