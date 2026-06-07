import React from 'react';
export interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}
/** Renders children only when the user is authenticated. */
export declare function SignedIn({ children }: {
    children: React.ReactNode;
}): React.JSX.Element | null;
/** Renders children only when the user is NOT authenticated. */
export declare function SignedOut({ children }: {
    children: React.ReactNode;
}): React.JSX.Element | null;
/** Protects a route, redirecting to login if not authenticated. */
export declare function AuthGuard({ children, fallback }: AuthGuardProps): React.JSX.Element | null;
export interface AuthLoadingProps {
    fallback?: React.ReactNode;
    children: React.ReactNode;
}
export declare function AuthLoading({ fallback, children }: AuthLoadingProps): React.JSX.Element;
//# sourceMappingURL=AuthGuard.d.ts.map