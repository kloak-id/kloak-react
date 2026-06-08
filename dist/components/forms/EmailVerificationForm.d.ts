import React from 'react';
export interface EmailVerificationFormProps {
    /** Called when verification successfully completes */
    onSuccess?: () => void;
    /** Custom class name for the wrapper container */
    className?: string;
    /** Optional token string. If not provided, it will automatically look for ?token= in the URL */
    token?: string;
}
export declare function EmailVerificationForm({ onSuccess, className, token: initialToken }: EmailVerificationFormProps): React.JSX.Element;
//# sourceMappingURL=EmailVerificationForm.d.ts.map