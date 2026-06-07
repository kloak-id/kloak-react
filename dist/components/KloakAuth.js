import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useRecipeList } from '../KloakProvider.js';
export function KloakAuth({ className }) {
    const recipes = useRecipeList();
    // Collect components from all recipes — must run before any hook calls
    const headerComponents = [];
    const bodyComponents = [];
    const footerComponents = [];
    const overlayComponents = [];
    recipes.forEach((recipe) => {
        if (recipe.renderUI) {
            overlayComponents.push(_jsx(React.Fragment, { children: recipe.renderUI() }, `overlay-${recipe.recipeId}`));
        }
        if (recipe.getAuthComponents) {
            const components = recipe.getAuthComponents();
            if (components.header)
                headerComponents.push(_jsx(React.Fragment, { children: components.header }, `header-${recipe.recipeId}`));
            if (components.body) {
                const label = recipe.recipeId === 'emailpassword' ? 'Password' :
                    recipe.recipeId === 'passwordless' ? 'Magic Link' :
                        recipe.recipeId.charAt(0).toUpperCase() + recipe.recipeId.slice(1);
                bodyComponents.push({ id: recipe.recipeId, label, ui: components.body });
            }
            if (components.footer)
                footerComponents.push(_jsx(React.Fragment, { children: components.footer }, `footer-${recipe.recipeId}`));
        }
    });
    // Lazy initializer — runs once on mount; recipes are static after provider init
    const [activeTabId, setActiveTabId] = useState(() => bodyComponents[0]?.id ?? '');
    const activeBody = bodyComponents.find(b => b.id === activeTabId)?.ui;
    return (_jsxs("div", { className: `relative ${className ?? ''}`, children: [headerComponents.length > 0 && (_jsx("div", { className: "kloak-auth-header mb-4", children: headerComponents })), headerComponents.length > 0 && bodyComponents.length > 0 && (_jsxs("div", { className: "relative my-4 flex items-center", children: [_jsx("div", { className: "flex-grow border-t" }), _jsx("span", { className: "flex-shrink-0 mx-4 text-xs uppercase text-muted-foreground", children: "or" }), _jsx("div", { className: "flex-grow border-t" })] })), bodyComponents.length > 1 && (_jsx("div", { className: "flex space-x-1 mb-4 bg-muted p-1 rounded-lg", children: bodyComponents.map(tab => (_jsx("button", { type: "button", className: `flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTabId === tab.id
                        ? 'bg-background shadow text-foreground'
                        : 'text-muted-foreground hover:text-foreground'}`, onClick: () => setActiveTabId(tab.id), children: tab.label }, tab.id))) })), activeBody && _jsx("div", { className: "kloak-auth-body", children: activeBody }), footerComponents.length > 0 && (_jsx("div", { className: "kloak-auth-footer mt-4", children: footerComponents })), overlayComponents] }));
}
//# sourceMappingURL=KloakAuth.js.map