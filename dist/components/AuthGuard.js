import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useAuthState } from '../hooks/useAuthState.js';
/** Renders children only when the user is authenticated. */
export function SignedIn({ children }) {
    const state = useAuthState();
    return state.isAuthenticated ? _jsx(_Fragment, { children: children }) : null;
}
/** Renders children only when the user is NOT authenticated. */
export function SignedOut({ children }) {
    const state = useAuthState();
    return !state.isAuthenticated && !state.isLoading ? _jsx(_Fragment, { children: children }) : null;
}
/** Protects a route, redirecting to login if not authenticated. */
export function AuthGuard({ children, fallback }) {
    const authState = useAuthState();
    useEffect(() => {
        if (!authState.isLoading && !authState.isAuthenticated) {
            if (typeof window !== 'undefined') {
                const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = `/login?redirect_url=${currentUrl}`;
            }
        }
    }, [authState.isLoading, authState.isAuthenticated]);
    if (authState.isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }));
    }
    if (!authState.isAuthenticated) {
        return fallback ? _jsx(_Fragment, { children: fallback }) : null;
    }
    return _jsx(_Fragment, { children: children });
}
export function AuthLoading({ fallback = null, children }) {
    const state = useAuthState();
    if (state.isLoading)
        return _jsx(_Fragment, { children: fallback });
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=AuthGuard.js.map