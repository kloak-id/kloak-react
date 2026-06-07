import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
export function ResetPasswordForm({ token, onSuccess, onError, className }) {
    const kloak = useKloak();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleSubmit(e) {
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
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Reset failed';
            setError(msg);
            onError?.(err instanceof Error ? err : new Error(msg));
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("form", { onSubmit: handleSubmit, className: className, children: [_jsx(Input, { id: "kloak-reset-password", label: "New password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "new-password" }), _jsx(Input, { id: "kloak-reset-confirm", label: "Confirm password", type: "password", value: confirm, onChange: (e) => setConfirm(e.target.value), required: true, autoComplete: "new-password" }), _jsx(FormError, { message: error }), _jsx(Button, { type: "submit", loading: loading, children: "Reset password" })] }));
}
//# sourceMappingURL=ResetPasswordForm.js.map