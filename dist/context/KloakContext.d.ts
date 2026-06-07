import React from 'react';
import { KloakClient } from '@kloak.id/web';
import type { KloakClientConfig } from '@kloak.id/web';
import type { AuthState } from '@kloak.id/web';
interface KloakContextValue {
    client: KloakClient;
    authState: AuthState;
}
export interface KloakProviderProps {
    config: KloakClientConfig;
    children: React.ReactNode;
}
export declare function KloakProvider({ config, children }: KloakProviderProps): React.JSX.Element;
export declare function useKloakContext(): KloakContextValue;
export {};
//# sourceMappingURL=KloakContext.d.ts.map