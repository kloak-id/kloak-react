import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
export function ForgotPasswordForm({ onSuccess, onError, className }) {
    const kloak = useKloak();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await kloak.emailPassword.requestPasswordReset(email);
            setSent(true);
            onSuccess?.();
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Request failed';
            setError(msg);
            onError?.(err instanceof Error ? err : new Error(msg));
        }
        finally {
            setLoading(false);
        }
    }
    if (sent) {
        return _jsx("p", { children: "Check your email for a reset link." });
    }
    return (_jsxs("form", { onSubmit: handleSubmit, className: className, children: [_jsx(Input, { id: "kloak-forgot-email", label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" }), _jsx(FormError, { message: error }), _jsx(Button, { type: "submit", loading: loading, children: "Send reset link" })] }));
}
//# sourceMappingURL=ForgotPasswordForm.js.map