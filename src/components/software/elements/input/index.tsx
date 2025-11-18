import React, { useCallback } from 'react';
import './styles.scss';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
    value: string;
    onTextChange(text: string): void;
};

export const Input = ({ value, onTextChange, ...rest }: InputProps) => {

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onTextChange(e.target.value);
    }, [onTextChange]);

    return (
        <div className="input">
            <input {...rest} onChange={onChange} autoComplete="off" />
        </div>
    );
}
