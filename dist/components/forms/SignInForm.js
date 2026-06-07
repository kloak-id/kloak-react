import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
export function SignInForm({ onSuccess, onMFAChallenge, onError, className }) {
    const kloak = useKloak();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const result = await kloak.emailPassword.signIn({ email, password });
            if (result.mfaRequired) {
                onMFAChallenge?.(result.mfaMethod, result.mfaToken);
            }
            else {
                onSuccess?.(result.user);
            }
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Sign in failed';
            setError(msg);
            onError?.(err instanceof Error ? err : new Error(msg));
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("form", { onSubmit: handleSubmit, className: className, children: [_jsx(Input, { id: "kloak-signin-email", label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" }), _jsx(Input, { id: "kloak-signin-password", label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "current-password" }), _jsx(FormError, { message: error }), _jsx(Button, { type: "submit", loading: loading, children: "Sign in" })] }));
}
//# sourceMappingURL=SignInForm.js.map