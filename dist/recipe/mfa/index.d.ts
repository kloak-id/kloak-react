import type { Recipe, RecipeBuilder, RecipeConfig } from '../../types/recipe.js';
export interface MFAConfig extends RecipeConfig {
}
declare class MFARecipe implements RecipeBuilder<MFAConfig> {
    init(config?: Partial<MFAConfig>): Recipe;
}
declare const _default: MFARecipe;
export default _default;
//# sourceMappingURL=index.d.ts.map