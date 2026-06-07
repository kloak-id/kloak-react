import React, { useEffect } from 'react';
import { useAuthState } from '../hooks/useAuthState.js';

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/** Renders children only when the user is authenticated. */
export function SignedIn({ children }: { children: React.ReactNode }) {
  const state = useAuthState();
  return state.isAuthenticated ? <>{children}</> : null;
}

/** Renders children only when the user is NOT authenticated. */
export function SignedOut({ children }: { children: React.ReactNode }) {
  const state = useAuthState();
  return !state.isAuthenticated && !state.isLoading ? <>{children}</> : null;
}

/** Protects a route, redirecting to login if not authenticated. */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

export interface AuthLoadingProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLoading({ fallback = null, children }: AuthLoadingProps) {
  const state = useAuthState();
  if (state.isLoading) return <>{fallback}</>;
  return <>{children}</>;
}
