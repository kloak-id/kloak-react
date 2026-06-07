import React, { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
import type { User } from '@kloak.id/web';

export interface SignInFormProps {
  onSuccess?: (user: User) => void;
  onMFAChallenge?: (method: string, token: string) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function SignInForm({ onSuccess, onMFAChallenge, onError, className }: SignInFormProps) {
  const kloak = useKloak();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await kloak.emailPassword.signIn({ email, password });
      if (result.mfaRequired) {
        onMFAChallenge?.(result.mfaMethod!, result.mfaToken!);
      } else {
        onSuccess?.(result.user!);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        id="kloak-signin-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="kloak-signin-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <FormError message={error} />
      <Button type="submit" loading={loading}>
        Sign in
      </Button>
    </form>
  );
}
