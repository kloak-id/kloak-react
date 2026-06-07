import React, { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
import type { User } from '@kloak.id/web';

export interface OtpFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function OtpForm({ onSuccess, onError, className }: OtpFormProps) {
  const kloak = useKloak();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await kloak.passwordless.sendCode({ email });
      setStep('code');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to send code';
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await kloak.passwordless.consumeCode({ email, code });
      onSuccess?.(user);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid code';
      setError(msg);
      onError?.(err instanceof Error ? err : new Error(msg));
    } finally {
      setLoading(false);
    }
  }

  if (step === 'email') {
    return (
      <form onSubmit={handleSend} className={className}>
        <Input
          id="kloak-otp-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <FormError message={error} />
        <Button type="submit" loading={loading}>
          Send code
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerify} className={className}>
      <p>Enter the code sent to {email}</p>
      <Input
        id="kloak-otp-code"
        label="One-time code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        maxLength={6}
      />
      <FormError message={error} />
      <Button type="submit" loading={loading}>
        Verify
      </Button>
      <button type="button" onClick={() => setStep('email')}>
        Use a different email
      </button>
    </form>
  );
}
