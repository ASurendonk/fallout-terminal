import React, { useCallback, useMemo } from 'react';
import { Character } from './utils';

type LetterProps = {
    character: Character;
    hover?: number;
    endHover?: number;
    onHover(character: Character): void;
    onLeave?(): void;
    onClick(character: Character): void;
}

export const Letter = ({character, hover, endHover, onHover, onLeave, onClick}: LetterProps) => {
    const isHovered = hover && endHover && character.id >= hover && character.id <= endHover;
    const _className = useMemo(() => `hack-char ${hover === character.id || isHovered ? 'hack-hover' : ''}`, [character, hover]);

    const _onHover = useCallback(() => onHover(character), [onHover, character]);
    const _onClick = useCallback(() => onClick(character), [onClick, character]);

    return (
        <div className={_className} onMouseOver={_onHover} onMouseLeave={onLeave} onClick={_onClick}>
            {character.value}
        </div>
    );
}
