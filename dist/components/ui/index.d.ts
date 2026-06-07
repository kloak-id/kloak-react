import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}
export declare function Button({ loading, disabled, children, className, ...props }: ButtonProps): React.JSX.Element;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
export declare function Input({ label, error, id, className, ...props }: InputProps): React.JSX.Element;
export interface FormErrorProps {
    message?: string | null;
}
export declare function FormError({ message }: FormErrorProps): React.JSX.Element | null;
//# sourceMappingURL=index.d.ts.map