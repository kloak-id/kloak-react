import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useKloak } from '../../hooks/useKloak.js';
import { Button, Input, FormError } from '../../components/ui/index.js';
function MFAChallengeRouter() {
    const kloak = useKloak();
    const [method, setMethod] = useState(null);
    const [token, setToken] = useState(null);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const handleChallenge = (e) => {
            const customEvent = e;
            setMethod(customEvent.detail.method);
            setToken(customEvent.detail.token);
        };
        window.addEventListener('kloak:mfa-challenge', handleChallenge);
        return () => window.removeEventListener('kloak:mfa-challenge', handleChallenge);
    }, []);
    if (!token)
        return null; // Not active
    async function handleVerify(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // In a full implementation, the client would have `client.mfa.verify`
            // Since it's a generic endpoint, we POST manually if the SDK lacks the wrapper
            const res = await fetch(`${kloak.config.baseUrl}/t/${kloak.config.tenantId}/auth/mfa/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ code })
            });
            if (!res.ok) {
                throw new Error('Invalid MFA code');
            }
            // Success, reload page to grab new session
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to verify');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "absolute inset-0 z-50 bg-white dark:bg-gray-900 rounded-xl flex flex-col kloak-recipe-mfa p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Two-Factor Authentication" }), _jsx("p", { className: "text-gray-500 mb-6 text-sm", children: "Please enter the code from your authenticator app." }), _jsxs("form", { onSubmit: handleVerify, children: [_jsx(Input, { id: "kloak-mfa-code", label: "Authenticator Code", type: "text", inputMode: "numeric", autoComplete: "one-time-code", value: code, onChange: (e) => setCode(e.target.value), required: true, maxLength: 6 }), _jsx(FormError, { message: error }), _jsx("div", { className: "mt-6", children: _jsx(Button, { type: "submit", loading: loading, className: "w-full", children: "Verify Code" }) })] })] }));
}
class MFARecipe {
    init(config) {
        return {
            recipeId: 'mfa',
            // If the MFA router is rendering (i.e. has token), it claims the whole screen
            renderUI: () => _jsx(MFAChallengeRouter, {})
        };
    }
}
export default new MFARecipe();
//# sourceMappingURL=index.js.map