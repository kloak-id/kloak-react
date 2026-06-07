import React, { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
import type { User } from '@kloak.id/web';

export interface SignUpFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function SignUpForm({ onSuccess, onError, className }: SignUpFormProps) {
  const kloak = useKloak();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await kloak.emailPassword.signUp({ email, password, firstName, lastName });
      onSuccess?.(user);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign up failed';
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        id="kloak-signup-firstname"
        label="First name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="given-name"
      />
      <Input
        id="kloak-signup-lastname"
        label="Last name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        autoComplete="family-name"
      />
      <Input
        id="kloak-signup-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="kloak-signup-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <FormError message={error} />
      <Button type="submit" loading={loading}>
        Create account
      </Button>
    </form>
  );
}
