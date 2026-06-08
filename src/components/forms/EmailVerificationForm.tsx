import React, { useEffect, useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, FormError } from '../ui/index.js';

export interface EmailVerificationFormProps {
  /** Called when verification successfully completes */
  onSuccess?: () => void;
  /** Custom class name for the wrapper container */
  className?: string;
  /** Optional token string. If not provided, it will automatically look for ?token= in the URL */
  token?: string;
}

export function EmailVerificationForm({ onSuccess, className, token: initialToken }: EmailVerificationFormProps) {
  const kloak = useKloak();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let activeToken = initialToken;
    
    // Automatically try to grab the token from the URL if we are in the browser
    if (!activeToken && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      activeToken = params.get('token') || undefined;
    }

    if (!activeToken) {
      setError('Verification token is missing from the URL.');
      return;
    }

    // Auto-verify if the token is present
    verify(activeToken);
  }, [initialToken]);

  async function verify(tokenToVerify: string) {
    setLoading(true);
    setError(null);
    try {
      await kloak.emailPassword.verifyEmail(tokenToVerify);
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify email. The link may be expired.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`kloak-email-verification ${className || ''}`}>
      {loading && (
        <div className="kloak-loading-state">
          <p>Verifying your email...</p>
        </div>
      )}
      
      {!loading && error && (
        <div className="kloak-error-state">
          <FormError message={error} />
          <Button onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </div>
      )}

      {!loading && success && (
        <div className="kloak-success-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--kloak-green, #10b981)', marginBottom: '1rem' }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3>Email Verified!</h3>
          <p>Your email address has been successfully verified.</p>
        </div>
      )}
    </div>
  );
}
