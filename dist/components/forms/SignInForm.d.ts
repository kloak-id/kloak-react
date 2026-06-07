import React from 'react';
import type { User } from '@kloak.id/web';
export interface SignInFormProps {
    onSuccess?: (user: User) => void;
    onMFAChallenge?: (method: string, token: string) => void;
    onError?: (error: Error) => void;
    className?: string;
}
export declare function SignInForm({ onSuccess, onMFAChallenge, onError, className }: SignInFormProps): React.JSX.Element;
//# sourceMappingURL=SignInForm.d.ts.map