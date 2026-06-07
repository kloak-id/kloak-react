import React, { useState, useEffect } from 'react';
import type { Recipe, RecipeBuilder, RecipeConfig, ComponentOverride } from '../../types/recipe.js';
import { SignInForm, type SignInFormProps } from '../../components/forms/SignInForm.js';
import { SignUpForm, type SignUpFormProps } from '../../components/forms/SignUpForm.js';
import { ForgotPasswordForm, type ForgotPasswordFormProps } from '../../components/forms/ForgotPasswordForm.js';
import { ResetPasswordForm, type ResetPasswordFormProps } from '../../components/forms/ResetPasswordForm.js';

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

type ViewState = 'signin' | 'signup' | 'forgot' | 'reset' | 'check-email';

function EmailPasswordRouter({ config }: { config?: Partial<EmailPasswordConfig> }) {
  const [view, setView] = useState<ViewState>('signin');
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = new URLSearchParams(window.location.search).get('token');
      if (token) {
        setResetToken(token);
        setView('reset');
      }
    }
  }, []);

  // Component Resolvers
  let SignIn = (props: SignInFormProps) => <SignInForm {...props} />;
  let SignUp = (props: SignUpFormProps) => <SignUpForm {...props} />;
  let Forgot = (props: ForgotPasswordFormProps) => <ForgotPasswordForm {...props} />;
  let Reset = (props: ResetPasswordFormProps) => <ResetPasswordForm {...props} />;

  if (config?.override?.components?.EmailPasswordSignIn_Override) {
    const Override = config.override.components.EmailPasswordSignIn_Override;
    SignIn = (props) => <Override {...props} DefaultComponent={SignInForm} />;
  }
  if (config?.override?.components?.EmailPasswordSignUp_Override) {
    const Override = config.override.components.EmailPasswordSignUp_Override;
    SignUp = (props) => <Override {...props} DefaultComponent={SignUpForm} />;
  }
  if (config?.override?.components?.EmailPasswordForgot_Override) {
    const Override = config.override.components.EmailPasswordForgot_Override;
    Forgot = (props) => <Override {...props} DefaultComponent={ForgotPasswordForm} />;
  }
  if (config?.override?.components?.EmailPasswordReset_Override) {
    const Override = config.override.components.EmailPasswordReset_Override;
    Reset = (props) => <Override {...props} DefaultComponent={ResetPasswordForm} />;
  }

  const handleSuccess = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="kloak-recipe-emailpassword">
      {view === 'signin' && (
        <>
          <SignIn 
            onSuccess={handleSuccess} 
            onMFAChallenge={(method, token) => {
              // We dispatch a custom event to tell KloakAuth to switch to MFA recipe
              window.dispatchEvent(new CustomEvent('kloak:mfa-challenge', { detail: { method, token } }));
            }}
          />
          <div className="mt-4 text-center text-sm">
            <button type="button" onClick={() => setView('forgot')} className="text-blue-600 hover:underline">Forgot password?</button>
            <span className="mx-2 text-gray-300">|</span>
            <button type="button" onClick={() => setView('signup')} className="text-blue-600 hover:underline">Sign up</button>
          </div>
        </>
      )}

      {view === 'signup' && (
        <>
          <SignUp onSuccess={() => setView('check-email')} />
          <div className="mt-4 text-center text-sm">
            <button type="button" onClick={() => setView('signin')} className="text-blue-600 hover:underline">Already have an account? Sign in</button>
          </div>
        </>
      )}

      {view === 'forgot' && (
        <>
          <Forgot onSuccess={() => setView('check-email')} />
          <div className="mt-4 text-center text-sm">
            <button type="button" onClick={() => setView('signin')} className="text-blue-600 hover:underline">Back to sign in</button>
          </div>
        </>
      )}

      {view === 'check-email' && (
        <div className="text-center space-y-4 py-4">
          <h3 className="text-lg font-medium">Check your email</h3>
          <p className="text-gray-500 text-sm">We've sent you a link to complete the process.</p>
          <button type="button" onClick={() => setView('signin')} className="text-blue-600 hover:underline text-sm">Return to sign in</button>
        </div>
      )}

      {view === 'reset' && resetToken && (
        <Reset token={resetToken} onSuccess={() => setView('signin')} />
      )}
    </div>
  );
}

class EmailPasswordRecipe implements RecipeBuilder<EmailPasswordConfig> {
  init(config?: Partial<EmailPasswordConfig>): Recipe {
    return {
      recipeId: 'emailpassword',
      getAuthComponents: () => ({
        body: <EmailPasswordRouter config={config} />
      })
    };
  }
}

export default new EmailPasswordRecipe();
