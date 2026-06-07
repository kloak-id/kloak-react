import React from 'react';
import type { Recipe, RecipeBuilder, RecipeConfig, ComponentOverride } from '../../types/recipe.js';
import { OtpForm, type OtpFormProps } from '../../components/forms/OtpForm.js';

export interface PasswordlessComponents {
  PasswordlessOtpForm_Override?: ComponentOverride<OtpFormProps>;
}

export interface PasswordlessConfig extends RecipeConfig {
  override?: {
    components?: PasswordlessComponents;
  };
}

function PasswordlessRouter({ config }: { config?: Partial<PasswordlessConfig> }) {
  let DefaultOtpForm = (props: OtpFormProps) => <OtpForm {...props} />;
  
  if (config?.override?.components?.PasswordlessOtpForm_Override) {
    const Override = config.override.components.PasswordlessOtpForm_Override;
    DefaultOtpForm = (props) => <Override {...props} DefaultComponent={OtpForm} />;
  }

  const handleSuccess = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="kloak-recipe-passwordless">
      <DefaultOtpForm onSuccess={handleSuccess} />
    </div>
  );
}

class PasswordlessRecipe implements RecipeBuilder<PasswordlessConfig> {
  init(config?: Partial<PasswordlessConfig>): Recipe {
    return {
      recipeId: 'passwordless',
      getAuthComponents: () => ({
        body: <PasswordlessRouter config={config} />
      })
    };
  }
}

export default new PasswordlessRecipe();
