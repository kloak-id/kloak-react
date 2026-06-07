import React from 'react';
import type { User } from '@kloak.id/web';
export interface SignUpFormProps {
    onSuccess?: (user: User) => void;
    onError?: (error: Error) => void;
    className?: string;
}
export declare function SignUpForm({ onSuccess, onError, className }: SignUpFormProps): React.JSX.Element;
//# sourceMappingURL=SignUpForm.d.ts.map