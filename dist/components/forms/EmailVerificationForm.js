import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, FormError } from '../ui/index.js';
export function EmailVerificationForm({ onSuccess, className, token: initialToken }) {
    const kloak = useKloak();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    async function verify(tokenToVerify) {
        setLoading(true);
        setError(null);
        try {
            await kloak.emailPassword.verifyEmail(tokenToVerify);
            setSuccess(true);
            onSuccess?.();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to verify email. The link may be expired.');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: `kloak-email-verification ${className || ''}`, children: [loading && (_jsx("div", { className: "kloak-loading-state", children: _jsx("p", { children: "Verifying your email..." }) })), !loading && error && (_jsxs("div", { className: "kloak-error-state", children: [_jsx(FormError, { message: error }), _jsx(Button, { onClick: () => window.location.href = '/', children: "Return to Home" })] })), !loading && success && (_jsxs("div", { className: "kloak-success-state", children: [_jsxs("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { color: 'var(--kloak-green, #10b981)', marginBottom: '1rem' }, children: [_jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), _jsx("polyline", { points: "22 4 12 14.01 9 11.01" })] }), _jsx("h3", { children: "Email Verified!" }), _jsx("p", { children: "Your email address has been successfully verified." })] }))] }));
}
//# sourceMappingURL=EmailVerificationForm.js.map