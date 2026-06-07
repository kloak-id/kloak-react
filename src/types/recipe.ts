import type { ReactNode } from 'react';

export interface RecipeConfig {
  recipeId?: string;
}

export interface ComponentOverride<TProps> {
  (props: TProps & { DefaultComponent: React.ComponentType<TProps> }): ReactNode;
}

export interface Recipe {
  recipeId: string;
  // Render the recipe UI if it matches the current path/state
  renderUI?: () => ReactNode;
  // Get components to render inside the main Auth UI
  getAuthComponents?: () => {
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
  };
}

export interface RecipeBuilder<TConfig extends RecipeConfig> {
  init(config?: Partial<TConfig>): Recipe;
}
