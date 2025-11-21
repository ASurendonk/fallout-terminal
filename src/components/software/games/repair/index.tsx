import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sequencer } from "components/sequencer";
import RepairUtils, { ErrorCharacter, RepairCharacter } from "components/software/games/repair/utils";

import "./styles.scss";
import { Button } from "components/software/elements";
import { navigate } from "helpers";
import { SYSTEMS } from "types";
import { SoundCode } from "helpers/sounds";

const errorCount = 8;
const lineCount = 12;
const characterCount = 35;

export const RepairGame = () => {

    const [index, setIndex] = useState(0);
    const [skip, setSkip] = useState(false);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        skip: skip,
    }), [setIndex, index, skip]);

    const onScreenClick = useCallback(() => {
        setSkip(true);
    }, []);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const [lines, setLines] = useState<RepairCharacter[][]>([]);
    const [errors, setErrors] = useState<ErrorCharacter[]>();

    const [scanner, setScanner] = useState(-1);
    const [errorColumns, setErrorColumns] = useState<number[]>([]);

    useEffect(() => {
        const { lines: builtLines, errors: builtErrors } = RepairUtils.buildLines(lineCount, characterCount);
        setLines(builtLines);
        setErrors(builtErrors);
    }, []);

    const errorValues = useMemo(() => errors?.map(e => e.value).join(""), [errors]);

    const onMouseEnterChar = useCallback(() => {
        window.audioManager.playRandomKey(0.01);
    }, []);

    const handleCharClick = useCallback((lineIndex: number, charIndex: number) => () => {

    }, []);

    const scan = useCallback((index: number) => {
        if (index <= characterCount) {
            setScanner(index);
            window.audioManager.play(SoundCode.tick, 0.01);

            if (RepairUtils.doesColumnHaveError(index, lines)) {
                window.audioManager.play(SoundCode.beep_low, 0.1);
                setErrorColumns(prev => {
                    if (!prev.includes(index)) {
                        return [...prev, index];
                    }
                    return prev;
                });
            } else {
                setErrorColumns(prev => prev.filter(col => col !== index));
            }

            setTimeout(() => {
                scan(index + 1);
            }, 75);
        }
    }, [lines]);

    const onScanClick = useCallback(() => {
        scan(0);
    }, [scan]);

    const renderedLines = useMemo(() => {
        return lines.map((line, lineIndex) => {
            const output = line.map((char, charIndex) => {
                const hasScanner = charIndex === scanner;
                const hasColumnError = errorColumns.some(ec => ec === charIndex);
                return (
                    <span className={`repair-char ${hasScanner ? "scanner" : ""} ${hasColumnError ? "error" : ""}`} onMouseEnter={onMouseEnterChar}
                          onClick={handleCharClick(lineIndex, charIndex)}>{char.value}</span>
                );
            });
            const hasError = line.some(l => l.isError);
            const indexValue = String(1 + lineIndex).padStart(4, "0");
            return (
                <Sequencer key={lineIndex} line order={lineIndex} delay {...sequencerProps}>
                    0x{indexValue} | {output} | <span className={`repair-line-state ${!hasError}`}>{hasError ? "ERROR" : "OK"}</span>
                </Sequencer>
            );
        });
    }, [lines, sequencerProps, onMouseEnterChar, handleCharClick, scanner, errorColumns]);

    return (
        <div className="repair" onClick={onScreenClick}>

            {renderedLines}

            <br/>
            <Sequencer line order={lineCount} delay {...sequencerProps}>
                <Button label="SCAN" fullWidth onClick={onScanClick}/>
            </Sequencer>
            <Sequencer line order={lineCount + 1} {...sequencerProps}>{"ERRORS | " + errorValues}</Sequencer>
        </div>
    );
}
