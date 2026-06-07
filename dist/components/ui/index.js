import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Button({ loading, disabled, children, className, ...props }) {
    return (_jsx("button", { disabled: disabled ?? loading, "aria-busy": loading, className: `inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className || ''}`, ...props, children: loading ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), _jsx("span", { children: "Loading..." })] })) : children }));
}
export function Input({ label, error, id, className, ...props }) {
    return (_jsxs("div", { className: "space-y-2", children: [label && _jsx("label", { htmlFor: id, className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label }), _jsx("input", { id: id, "aria-invalid": !!error, className: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive focus-visible:ring-destructive' : ''} ${className || ''}`, ...props }), error && _jsx("span", { role: "alert", className: "text-[0.8rem] font-medium text-destructive", children: error })] }));
}
export function FormError({ message }) {
    if (!message)
        return null;
    return _jsx("div", { role: "alert", className: "text-[0.8rem] font-medium text-destructive mt-2", children: message });
}
//# sourceMappingURL=index.js.map