import type { Recipe, RecipeBuilder, RecipeConfig, ComponentOverride } from '../../types/recipe.js';
import type { SocialProvider } from '@kloak.id/web';
export interface ThirdPartyProviderButtonProps {
    provider: SocialProvider;
    onClick: () => void;
}
export interface ThirdPartyComponents {
    ThirdPartyProviderButton_Override?: ComponentOverride<ThirdPartyProviderButtonProps>;
}
export interface ThirdPartyConfig extends RecipeConfig {
    providers: SocialProvider[];
    override?: {
        components?: ThirdPartyComponents;
    };
}
declare class ThirdPartyRecipe implements RecipeBuilder<ThirdPartyConfig> {
    init(config: ThirdPartyConfig): Recipe;
}
declare const _default: ThirdPartyRecipe;
export default _default;
//# sourceMappingURL=index.d.ts.map