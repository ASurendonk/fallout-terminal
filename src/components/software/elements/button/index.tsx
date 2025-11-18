import React, {useCallback} from 'react';
import './styles.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string | React.ReactNode;
    fullWidth?: boolean;
};

export const Button = ({label, fullWidth, onClick, ...rest}: ButtonProps) => {
    const onClickButton = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        window.audioManager.playRandomKey();
        onClick?.(event);
    }, [onClick])

    const onMouseOver = useCallback(() => {
        window.audioManager.playRandomKey();
    }, []);

    return (
        <button className={`button ${fullWidth && "full-width"}`} {...rest} onClick={onClickButton} onMouseEnter={onMouseOver}>
            [{label}]
        </button>
    );
}
