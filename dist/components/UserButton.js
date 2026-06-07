import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useUser } from '../hooks/useUser.js';
import { useSession } from '../hooks/useSession.js';
/** Avatar button with a dropdown showing the user's email and a sign-out option. */
export function UserButton({ onSignOut, className }) {
    const { user, isLoading } = useUser();
    const { signOut } = useSession();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    // Close on outside click
    useEffect(() => {
        function handler(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);
    if (isLoading)
        return null;
    if (!user)
        return null;
    const initials = [user.firstName, user.lastName]
        .filter(Boolean)
        .map((n) => n[0].toUpperCase())
        .join('') || user.email[0].toUpperCase();
    async function handleSignOut() {
        setOpen(false);
        await signOut();
        onSignOut?.();
    }
    return (_jsxs("div", { ref: ref, style: { position: 'relative', display: 'inline-block' }, className: className, children: [_jsx("button", { type: "button", onClick: () => setOpen((o) => !o), "aria-expanded": open, "aria-haspopup": "true", title: user.email, children: initials }), open && (_jsxs("div", { role: "menu", children: [_jsxs("div", { children: [user.firstName && user.lastName && (_jsx("p", { children: `${user.firstName} ${user.lastName}` })), _jsx("p", { children: user.email })] }), _jsx("hr", {}), _jsx("button", { type: "button", role: "menuitem", onClick: handleSignOut, children: "Sign out" })] }))] }));
}
//# sourceMappingURL=UserButton.js.map