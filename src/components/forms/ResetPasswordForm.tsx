import React, { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';

export interface ResetPasswordFormProps {
  /** The reset token from the email link (e.g. from URL query params) */
  token: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function ResetPasswordForm({ token, onSuccess, onError, className }: ResetPasswordFormProps) {
  const kloak = useKloak();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await kloak.emailPassword.resetPassword(token, password);
      onSuccess?.();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Reset failed';
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        id="kloak-reset-password"
        label="New password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Input
        id="kloak-reset-confirm"
        label="Confirm password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        autoComplete="new-password"
      />
      <FormError message={error} />
      <Button type="submit" loading={loading}>
        Reset password
      </Button>
    </form>
  );
}
