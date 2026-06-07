import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
export function SignUpForm({ onSuccess, onError, className }) {
    const kloak = useKloak();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const user = await kloak.emailPassword.signUp({ email, password, firstName, lastName });
            onSuccess?.(user);
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Sign up failed';
            setError(msg);
            onError?.(err instanceof Error ? err : new Error(msg));
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("form", { onSubmit: handleSubmit, className: className, children: [_jsx(Input, { id: "kloak-signup-firstname", label: "First name", type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value), autoComplete: "given-name" }), _jsx(Input, { id: "kloak-signup-lastname", label: "Last name", type: "text", value: lastName, onChange: (e) => setLastName(e.target.value), autoComplete: "family-name" }), _jsx(Input, { id: "kloak-signup-email", label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" }), _jsx(Input, { id: "kloak-signup-password", label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "new-password" }), _jsx(FormError, { message: error }), _jsx(Button, { type: "submit", loading: loading, children: "Create account" })] }));
}
//# sourceMappingURL=SignUpForm.js.map