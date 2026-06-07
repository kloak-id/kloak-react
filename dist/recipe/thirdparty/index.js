import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useKloak } from '../../hooks/useKloak.js';
import { Button } from '../../components/ui/index.js';
function DefaultProviderButton({ provider, onClick }) {
    // Simple capitalization
    const label = provider.charAt(0).toUpperCase() + provider.slice(1);
    return (_jsxs(Button, { type: "button", className: "w-full flex items-center justify-center gap-2 mb-2", onClick: onClick, children: ["Continue with ", label] }));
}
function ThirdPartyHeader({ config }) {
    const kloak = useKloak();
    let ProviderButton = DefaultProviderButton;
    if (config.override?.components?.ThirdPartyProviderButton_Override) {
        const Override = config.override.components.ThirdPartyProviderButton_Override;
        ProviderButton = (props) => _jsx(Override, { ...props, DefaultComponent: DefaultProviderButton });
    }
    const handleLogin = (provider) => {
        kloak.social.redirectToProvider({ provider });
    };
    return (_jsx("div", { className: "kloak-recipe-thirdparty flex flex-col w-full", children: config.providers.map(provider => (_jsx(ProviderButton, { provider: provider, onClick: () => handleLogin(provider) }, provider))) }));
}
class ThirdPartyRecipe {
    init(config) {
        return {
            recipeId: 'thirdparty',
            getAuthComponents: () => ({
                // Social buttons usually appear in the header (above the OR divider)
                header: _jsx(ThirdPartyHeader, { config: config })
            })
        };
    }
}
export default new ThirdPartyRecipe();
//# sourceMappingURL=index.js.map