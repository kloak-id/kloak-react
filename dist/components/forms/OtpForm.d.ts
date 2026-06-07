import React from 'react';
import type { User } from '@kloak.id/web';
export interface OtpFormProps {
    onSuccess?: (user: User) => void;
    onError?: (error: Error) => void;
    className?: string;
}
export declare function OtpForm({ onSuccess, onError, className }: OtpFormProps): React.JSX.Element;
//# sourceMappingURL=OtpForm.d.ts.map