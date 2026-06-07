import React from 'react';
export interface UserButtonProps {
    /** Called after sign out completes */
    onSignOut?: () => void;
    className?: string;
}
/** Avatar button with a dropdown showing the user's email and a sign-out option. */
export declare function UserButton({ onSignOut, className }: UserButtonProps): React.JSX.Element | null;
//# sourceMappingURL=UserButton.d.ts.map