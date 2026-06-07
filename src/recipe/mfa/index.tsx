import React, { useState, useEffect } from 'react';
import type { Recipe, RecipeBuilder, RecipeConfig } from '../../types/recipe.js';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../../components/ui/index.js';

export interface MFAConfig extends RecipeConfig {}

function MFAChallengeRouter() {
  const kloak = useKloak();
  const [method, setMethod] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleChallenge = (e: Event) => {
      const customEvent = e as CustomEvent<{ method: string; token: string }>;
      setMethod(customEvent.detail.method);
      setToken(customEvent.detail.token);
    };

    window.addEventListener('kloak:mfa-challenge', handleChallenge);
    return () => window.removeEventListener('kloak:mfa-challenge', handleChallenge);
  }, []);

  if (!token) return null; // Not active

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // In a full implementation, the client would have `client.mfa.verify`
      // Since it's a generic endpoint, we POST manually if the SDK lacks the wrapper
      const res = await fetch(`${kloak.config.baseUrl}/t/${kloak.config.tenantId}/auth/mfa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });
      
      if (!res.ok) {
        throw new Error('Invalid MFA code');
      }

      // Success, reload page to grab new session
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 z-50 bg-white dark:bg-gray-900 rounded-xl flex flex-col kloak-recipe-mfa p-6">
      <h2 className="text-xl font-semibold mb-2">Two-Factor Authentication</h2>
      <p className="text-gray-500 mb-6 text-sm">Please enter the code from your authenticator app.</p>
      
      <form onSubmit={handleVerify}>
        <Input
          id="kloak-mfa-code"
          label="Authenticator Code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          maxLength={6}
        />
        <FormError message={error} />
        <div className="mt-6">
          <Button type="submit" loading={loading} className="w-full">
            Verify Code
          </Button>
        </div>
      </form>
    </div>
  );
}

class MFARecipe implements RecipeBuilder<MFAConfig> {
  init(config?: Partial<MFAConfig>): Recipe {
    return {
      recipeId: 'mfa',
      // If the MFA router is rendering (i.e. has token), it claims the whole screen
      renderUI: () => <MFAChallengeRouter />
    };
  }
}

export default new MFARecipe();
