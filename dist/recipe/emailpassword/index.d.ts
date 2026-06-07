import type { Recipe, RecipeBuilder, RecipeConfig, ComponentOverride } from '../../types/recipe.js';
import { type SignInFormProps } from '../../components/forms/SignInForm.js';
import { type SignUpFormProps } from '../../components/forms/SignUpForm.js';
import { type ForgotPasswordFormProps } from '../../components/forms/ForgotPasswordForm.js';
import { type ResetPasswordFormProps } from '../../components/forms/ResetPasswordForm.js';
export interface EmailPasswordComponents {
    EmailPasswordSignIn_Override?: ComponentOverride<SignInFormProps>;
    EmailPasswordSignUp_Override?: ComponentOverride<SignUpFormProps>;
    EmailPasswordForgot_Override?: ComponentOverride<ForgotPasswordFormProps>;
    EmailPasswordReset_Override?: ComponentOverride<ResetPasswordFormProps>;
}
export interface EmailPasswordConfig extends RecipeConfig {
    override?: {
        components?: EmailPasswordComponents;
    };
}
declare class EmailPasswordRecipe implements RecipeBuilder<EmailPasswordConfig> {
    init(config?: Partial<EmailPasswordConfig>): Recipe;
}
declare const _default: EmailPasswordRecipe;
export default _default;
//# sourceMappingURL=index.d.ts.map