import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../ui/index.js';
export function OtpForm({ onSuccess, onError, className }) {
    const kloak = useKloak();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleSend(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await kloak.passwordless.sendCode({ email });
            setStep('code');
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to send code';
            setError(msg);
            onError?.(err instanceof Error ? err : new Error(msg));
        }
        finally {
            setLoading(false);
        }
    }
    async function handleVerify(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const user = await kloak.passwordless.consumeCode({ email, code });
            onSuccess?.(user);
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : 'Invalid code';
            setError(msg);
            onError?.(err instanceof Error ? err : new Error(msg));
        }
        finally {
            setLoading(false);
        }
    }
    if (step === 'email') {
        return (_jsxs("form", { onSubmit: handleSend, className: className, children: [_jsx(Input, { id: "kloak-otp-email", label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" }), _jsx(FormError, { message: error }), _jsx(Button, { type: "submit", loading: loading, children: "Send code" })] }));
    }
    return (_jsxs("form", { onSubmit: handleVerify, className: className, children: [_jsxs("p", { children: ["Enter the code sent to ", email] }), _jsx(Input, { id: "kloak-otp-code", label: "One-time code", type: "text", inputMode: "numeric", autoComplete: "one-time-code", value: code, onChange: (e) => setCode(e.target.value), required: true, maxLength: 6 }), _jsx(FormError, { message: error }), _jsx(Button, { type: "submit", loading: loading, children: "Verify" }), _jsx("button", { type: "button", onClick: () => setStep('email'), children: "Use a different email" })] }));
}
//# sourceMappingURL=OtpForm.js.map