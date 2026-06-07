import React, { useState } from 'react';
import { useRecipeList } from '../KloakProvider.js';
import type { Recipe } from '../types/recipe.js';

export interface KloakAuthProps {
  className?: string;
}

export function KloakAuth({ className }: KloakAuthProps) {
  const recipes = useRecipeList();

  // Collect components from all recipes — must run before any hook calls
  const headerComponents: React.ReactNode[] = [];
  const bodyComponents: { id: string; label: string; ui: React.ReactNode }[] = [];
  const footerComponents: React.ReactNode[] = [];
  const overlayComponents: React.ReactNode[] = [];

  recipes.forEach((recipe: Recipe) => {
    if (recipe.renderUI) {
      overlayComponents.push(<React.Fragment key={`overlay-${recipe.recipeId}`}>{recipe.renderUI()}</React.Fragment>);
    }
    if (recipe.getAuthComponents) {
      const components = recipe.getAuthComponents();
      if (components.header) headerComponents.push(<React.Fragment key={`header-${recipe.recipeId}`}>{components.header}</React.Fragment>);
      if (components.body) {
        const label =
          recipe.recipeId === 'emailpassword' ? 'Password' :
          recipe.recipeId === 'passwordless'  ? 'Magic Link' :
          recipe.recipeId.charAt(0).toUpperCase() + recipe.recipeId.slice(1);
        bodyComponents.push({ id: recipe.recipeId, label, ui: components.body });
      }
      if (components.footer) footerComponents.push(<React.Fragment key={`footer-${recipe.recipeId}`}>{components.footer}</React.Fragment>);
    }
  });

  // Lazy initializer — runs once on mount; recipes are static after provider init
  const [activeTabId, setActiveTabId] = useState<string>(() => bodyComponents[0]?.id ?? '');

  const activeBody = bodyComponents.find(b => b.id === activeTabId)?.ui;

  return (
    <div className={`relative ${className ?? ''}`}>
      {headerComponents.length > 0 && (
        <div className="kloak-auth-header mb-4">{headerComponents}</div>
      )}

      {headerComponents.length > 0 && bodyComponents.length > 0 && (
        <div className="relative my-4 flex items-center">
          <div className="flex-grow border-t" />
          <span className="flex-shrink-0 mx-4 text-xs uppercase text-muted-foreground">or</span>
          <div className="flex-grow border-t" />
        </div>
      )}

      {bodyComponents.length > 1 && (
        <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
          {bodyComponents.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTabId === tab.id
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeBody && <div className="kloak-auth-body">{activeBody}</div>}

      {footerComponents.length > 0 && (
        <div className="kloak-auth-footer mt-4">{footerComponents}</div>
      )}

      {/* Overlays (e.g. MFA challenge) — renders on top when active, null when idle */}
      {overlayComponents}
    </div>
  );
}
