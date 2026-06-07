import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { KloakClient } from '@kloak.id/web';
const KloakContext = createContext(null);
export function KloakProvider({ config, children }) {
    const clientRef = useRef(null);
    if (!clientRef.current) {
        clientRef.current = new KloakClient(config);
    }
    const client = clientRef.current;
    const [authState, setAuthState] = useState(() => client.getAuthState());
    useEffect(() => {
        return client.onAuthStateChange(setAuthState);
    }, [client]);
    return (_jsx(KloakContext.Provider, { value: { client, authState }, children: children }));
}
export function useKloakContext() {
    const ctx = useContext(KloakContext);
    if (!ctx) {
        throw new Error('useKloakContext must be used inside <KloakProvider>');
    }
    return ctx;
}
//# sourceMappingURL=KloakContext.js.map