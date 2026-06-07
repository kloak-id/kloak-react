import React, { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';

export interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function ForgotPasswordForm({ onSuccess, onError, className }: ForgotPasswordFormProps) {
  const kloak = useKloak();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await kloak.emailPassword.requestPasswordReset(email);
      setSent(true);
      onSuccess?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Request failed';
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return <p>Check your email for a reset link.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        id="kloak-forgot-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <FormError message={error} />
      <Button type="submit" loading={loading}>
        Send reset link
      </Button>
    </form>
  );
}
