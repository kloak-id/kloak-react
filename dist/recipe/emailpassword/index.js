import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { SignInForm } from '../../components/forms/SignInForm.js';
import { SignUpForm } from '../../components/forms/SignUpForm.js';
import { ForgotPasswordForm } from '../../components/forms/ForgotPasswordForm.js';
import { ResetPasswordForm } from '../../components/forms/ResetPasswordForm.js';
function EmailPasswordRouter({ config }) {
    const [view, setView] = useState('signin');
    const [resetToken, setResetToken] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = new URLSearchParams(window.location.search).get('token');
            if (token) {
                setResetToken(token);
                setView('reset');
            }
        }
    }, []);
    // Component Resolvers
    let SignIn = (props) => _jsx(SignInForm, { ...props });
    let SignUp = (props) => _jsx(SignUpForm, { ...props });
    let Forgot = (props) => _jsx(ForgotPasswordForm, { ...props });
    let Reset = (props) => _jsx(ResetPasswordForm, { ...props });
    if (config?.override?.components?.EmailPasswordSignIn_Override) {
        const Override = config.override.components.EmailPasswordSignIn_Override;
        SignIn = (props) => _jsx(Override, { ...props, DefaultComponent: SignInForm });
    }
    if (config?.override?.components?.EmailPasswordSignUp_Override) {
        const Override = config.override.components.EmailPasswordSignUp_Override;
        SignUp = (props) => _jsx(Override, { ...props, DefaultComponent: SignUpForm });
    }
    if (config?.override?.components?.EmailPasswordForgot_Override) {
        const Override = config.override.components.EmailPasswordForgot_Override;
        Forgot = (props) => _jsx(Override, { ...props, DefaultComponent: ForgotPasswordForm });
    }
    if (config?.override?.components?.EmailPasswordReset_Override) {
        const Override = config.override.components.EmailPasswordReset_Override;
        Reset = (props) => _jsx(Override, { ...props, DefaultComponent: ResetPasswordForm });
    }
    const handleSuccess = () => {
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
    };
    return (_jsxs("div", { className: "kloak-recipe-emailpassword", children: [view === 'signin' && (_jsxs(_Fragment, { children: [_jsx(SignIn, { onSuccess: handleSuccess, onMFAChallenge: (method, token) => {
                            // We dispatch a custom event to tell KloakAuth to switch to MFA recipe
                            window.dispatchEvent(new CustomEvent('kloak:mfa-challenge', { detail: { method, token } }));
                        } }), _jsxs("div", { className: "mt-4 text-center text-sm", children: [_jsx("button", { type: "button", onClick: () => setView('forgot'), className: "text-blue-600 hover:underline", children: "Forgot password?" }), _jsx("span", { className: "mx-2 text-gray-300", children: "|" }), _jsx("button", { type: "button", onClick: () => setView('signup'), className: "text-blue-600 hover:underline", children: "Sign up" })] })] })), view === 'signup' && (_jsxs(_Fragment, { children: [_jsx(SignUp, { onSuccess: () => setView('check-email') }), _jsx("div", { className: "mt-4 text-center text-sm", children: _jsx("button", { type: "button", onClick: () => setView('signin'), className: "text-blue-600 hover:underline", children: "Already have an account? Sign in" }) })] })), view === 'forgot' && (_jsxs(_Fragment, { children: [_jsx(Forgot, { onSuccess: () => setView('check-email') }), _jsx("div", { className: "mt-4 text-center text-sm", children: _jsx("button", { type: "button", onClick: () => setView('signin'), className: "text-blue-600 hover:underline", children: "Back to sign in" }) })] })), view === 'check-email' && (_jsxs("div", { className: "text-center space-y-4 py-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Check your email" }), _jsx("p", { className: "text-gray-500 text-sm", children: "We've sent you a link to complete the process." }), _jsx("button", { type: "button", onClick: () => setView('signin'), className: "text-blue-600 hover:underline text-sm", children: "Return to sign in" })] })), view === 'reset' && resetToken && (_jsx(Reset, { token: resetToken, onSuccess: () => setView('signin') }))] }));
}
class EmailPasswordRecipe {
    init(config) {
        return {
            recipeId: 'emailpassword',
            getAuthComponents: () => ({
                body: _jsx(EmailPasswordRouter, { config: config })
            })
        };
    }
}
export default new EmailPasswordRecipe();
//# sourceMappingURL=index.js.map