import type { Recipe, RecipeBuilder, RecipeConfig, ComponentOverride } from '../../types/recipe.js';
import { type OtpFormProps } from '../../components/forms/OtpForm.js';
export interface PasswordlessComponents {
    PasswordlessOtpForm_Override?: ComponentOverride<OtpFormProps>;
}
export interface PasswordlessConfig extends RecipeConfig {
    override?: {
        components?: PasswordlessComponents;
    };
}
declare class PasswordlessRecipe implements RecipeBuilder<PasswordlessConfig> {
    init(config?: Partial<PasswordlessConfig>): Recipe;
}
declare const _default: PasswordlessRecipe;
export default _default;
//# sourceMappingURL=index.d.ts.map