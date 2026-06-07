export interface UseSessionResult {
    sessionId: string | null;
    signOut: () => Promise<void>;
}
/** Returns the current session ID and a signOut helper. */
export declare function useSession(): UseSessionResult;
//# sourceMappingURL=useSession.d.ts.map