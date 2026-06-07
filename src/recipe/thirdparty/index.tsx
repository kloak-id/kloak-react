import React from 'react';
import type { Recipe, RecipeBuilder, RecipeConfig, ComponentOverride } from '../../types/recipe.js';
import { useKloak } from '../../hooks/useKloak.js';
import { Button } from '../../components/ui/index.js';
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

function DefaultProviderButton({ provider, onClick }: ThirdPartyProviderButtonProps) {
  // Simple capitalization
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);
  return (
    <Button 
      type="button" 
      className="w-full flex items-center justify-center gap-2 mb-2" 
      onClick={onClick}
    >
      Continue with {label}
    </Button>
  );
}

function ThirdPartyHeader({ config }: { config: ThirdPartyConfig }) {
  const kloak = useKloak();

  let ProviderButton = DefaultProviderButton;
  if (config.override?.components?.ThirdPartyProviderButton_Override) {
    const Override = config.override.components.ThirdPartyProviderButton_Override;
    ProviderButton = (props) => <Override {...props} DefaultComponent={DefaultProviderButton} />;
  }

  const handleLogin = (provider: SocialProvider) => {
    kloak.social.redirectToProvider({ provider });
  };

  return (
    <div className="kloak-recipe-thirdparty flex flex-col w-full">
      {config.providers.map(provider => (
        <ProviderButton 
          key={provider} 
          provider={provider} 
          onClick={() => handleLogin(provider)} 
        />
      ))}
    </div>
  );
}

class ThirdPartyRecipe implements RecipeBuilder<ThirdPartyConfig> {
  init(config: ThirdPartyConfig): Recipe {
    return {
      recipeId: 'thirdparty',
      getAuthComponents: () => ({
        // Social buttons usually appear in the header (above the OR divider)
        header: <ThirdPartyHeader config={config} />
      })
    };
  }
}

export default new ThirdPartyRecipe();
