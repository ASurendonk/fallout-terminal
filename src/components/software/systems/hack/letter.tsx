import React, {useCallback, useMemo} from 'react';
import {Character} from './utils';

type LetterProps = {
    character: Character;
    // hover?: boolean;
    hover?: number;
    onHover(character: Character): void;
    onLeave(): void;
    onClick(character: Character): void;
}

export const Letter = ({character, hover, onHover, onLeave, onClick}: LetterProps) => {
    console.log(hover);
    const _className = useMemo(() => `hack-char ${hover === character.id ? 'hack-hover' : ''}`, [character, hover]);
    // const _className = useMemo(() => `hack-char`, []);
    const _onHover = useCallback(() => onHover(character), [onHover, character]);
    const _onClick = useCallback(() => onClick(character), [onClick, character]);
    // const _onHover = useCallback(() => null, []);
    // const _onClick = useCallback(() => null, []);

    return (
        <div className={_className} onMouseOver={_onHover} onMouseLeave={onLeave} onClick={_onClick}>
            {character.value}
        </div>
    );
}