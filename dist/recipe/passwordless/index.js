import { jsx as _jsx } from "react/jsx-runtime";
import { OtpForm } from '../../components/forms/OtpForm.js';
function PasswordlessRouter({ config }) {
    let DefaultOtpForm = (props) => _jsx(OtpForm, { ...props });
    if (config?.override?.components?.PasswordlessOtpForm_Override) {
        const Override = config.override.components.PasswordlessOtpForm_Override;
        DefaultOtpForm = (props) => _jsx(Override, { ...props, DefaultComponent: OtpForm });
    }
    const handleSuccess = () => {
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
    };
    return (_jsx("div", { className: "kloak-recipe-passwordless", children: _jsx(DefaultOtpForm, { onSuccess: handleSuccess }) }));
}
class PasswordlessRecipe {
    init(config) {
        return {
            recipeId: 'passwordless',
            getAuthComponents: () => ({
                body: _jsx(PasswordlessRouter, { config: config })
            })
        };
    }
}
export default new PasswordlessRecipe();
//# sourceMappingURL=index.js.map