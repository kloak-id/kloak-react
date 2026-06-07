import React from 'react';
export interface ResetPasswordFormProps {
    /** The reset token from the email link (e.g. from URL query params) */
    token: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    className?: string;
}
export declare function ResetPasswordForm({ token, onSuccess, onError, className }: ResetPasswordFormProps): React.JSX.Element;
//# sourceMappingURL=ResetPasswordForm.d.ts.map