import { useKloak as useKloakFromProvider } from '../KloakProvider.js';
import type { KloakClient } from '@kloak.id/web';

/** Access the raw KloakClient instance. */
export function useKloak(): KloakClient {
  return useKloakFromProvider();
}
