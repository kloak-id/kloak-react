import type { ReactNode } from 'react';
export interface RecipeConfig {
    recipeId?: string;
}
export interface ComponentOverride<TProps> {
    (props: TProps & {
        DefaultComponent: React.ComponentType<TProps>;
    }): ReactNode;
}
export interface Recipe {
    recipeId: string;
    renderUI?: () => ReactNode;
    getAuthComponents?: () => {
        header?: ReactNode;
        body?: ReactNode;
        footer?: ReactNode;
    };
}
export interface RecipeBuilder<TConfig extends RecipeConfig> {
    init(config?: Partial<TConfig>): Recipe;
}
//# sourceMappingURL=recipe.d.ts.map