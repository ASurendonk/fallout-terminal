import React, { useCallback, useState } from 'react';
import './styles.scss';

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: string;
    onTextChange(text: string): void;
};

export const PasswordInput = ({ value, onTextChange, ...rest }: PasswordInputProps) => {

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onTextChange(e.target.value);
    }, [onTextChange]);

    const displayValue = value.replace(/./g, '*');

    return (
        <div className="password-input">
            <input {...rest} value={value} onChange={onChange} autoComplete="off" spellCheck="false" maxLength={12} />
            <div className="password-input-display">{displayValue || " "}</div>
        </div>
    );
}
