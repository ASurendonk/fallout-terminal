import React from 'react';
import './styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onTextChange(text: string): void;
};

export const Input = ({value, onTextChange, ...rest}: InputProps) => {
    return (
        <div className="input">
            {'>'}
            <input {...rest} maxLength={12} value={value} onChange={e => onTextChange(e.target.value)} autoComplete="off" />
        </div>
    );
}
