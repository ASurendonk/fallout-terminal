import React, {useCallback} from 'react';
import './styles.scss';
import {playRandomKey} from 'helpers/sounds';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string | React.ReactNode;
};

export const Button = ({label, onClick, ...rest}: ButtonProps) => {
    const onClickButton = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        playRandomKey();
        onClick?.(event);
    }, [onClick])

    return (
        <button className="button" {...rest} onClick={onClickButton} onMouseEnter={() => playRandomKey()}>
            {label}
        </button>
    );
}
