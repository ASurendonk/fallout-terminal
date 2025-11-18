import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Utils, { Character, HackOption, HackType, WordOption } from './utils';
import './styles.scss';
import { Button, Title } from 'components/software/elements';
import { Letter } from "./letter";
import { useDebouncedCallback } from "use-debounce";
import { navigate } from "helpers/index.ts";
import { SYSTEMS } from "types/index.ts";
import { notify } from "store/mainframeSlice.ts";
import { useDispatch } from "hooks/dispatch.ts";
import { SoundCode } from "helpers/sounds.ts";

type HistoryWord = {
    word: string;
    similarity: number;
}
type HistoryHack = {
    id: number;
    value: string;
    type: HackType;
}
type HistoryError = {
    error: string;
}

type UsedHack = {
    id: number;
    value: string;
}

type HackProps = {
    difficulty?: 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    totalWords?: 12 | 14 | 16,
}

const _block_lines = 16;
const _characters_per_line = 12;
const _block_length = _block_lines * _characters_per_line;

export const Hack = (props: HackProps) => {
    const {difficulty = 6, totalWords = 14} = props;

    const [block1, setBlock1] = useState<Character[]>([]);
    const [block2, setBlock2] = useState<Character[]>([]);
    const [tries, setTries] = useState(4);
    const [words, setWords] = useState<WordOption[]>([]);
    const [passwordIndex, setPasswordIndex] = useState(0);
    const [remainingWords, setRemainingWords] = useState<WordOption[]>([]);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);
    const [history, setHistory] = useState<(HistoryWord | HistoryHack| HistoryError)[]>([]);
    const [hover, setHover] = useState<number>();
    const [endHover, setEndHover] = useState<number>();
    const [usedHacks, setUsedHacks] = useState<UsedHack[]>([]);

    const [userInput, setUserInput] = useState('');
    const inputRef = useRef<any>();
    const dispatch = useDispatch();

    useEffect(() => {
        let timer: any;

        const playTick = (index: number) => {
            if (index < 64) {
                timer = setTimeout(() => {
                    window.audioManager.play(SoundCode.tick, 0.01);
                    playTick(index + 1);
                }, 47);
            }
        };
        setTimeout(() => playTick(0), 0);

        return () => clearTimeout(timer);
    }, []);

    const hex_start_position = useMemo(() => Utils.randomIntFromInterval(4096, 61440), []); // HEX: 1000 - f000

    const initWords = useCallback((words: string[]) => {
        const _block1 = Utils.randomCharacters(_block_length, 1000);
        const _block2 = Utils.randomCharacters(_block_length, 2000);

        const passwordIndex = Math.floor(Math.random() * (totalWords));

        const randomPositionsOne = Utils.buildRandomWordPositions(_block_length, difficulty, totalWords / 2);
        const randomPositionsTwo = Utils.buildRandomWordPositions(_block_length, difficulty, totalWords / 2);

        const _column1: WordOption[] = [];
        const _column2: WordOption[] = [];
        words.forEach((word, i) => {
            if(i < (totalWords / 2)){
                _column1.push({ value: word, position: randomPositionsOne[i] });
            } else {
                _column2.push({ value: word, position: randomPositionsTwo[i-(totalWords/2)] });
            }
        });

        // change block values
        _column1.forEach((obj, index) => {
            for(let i = 0; i < difficulty; i++) {
                _block1[obj.position+i] = { id: index, value: obj.value.split('')[i] };
            }
        });

        _column2.map((obj, index) => {
            for(let i = 0; i < difficulty; i++) {
                _block2[obj.position+i] = { id: index + (totalWords/2), value: obj.value.split('')[i] };
            }
            return null;
        });

        const _words = [..._column1, ..._column2];

        setWords(Array.from(_words));
        setPasswordIndex(passwordIndex);
        setBlock1(_block1);
        setBlock2(_block2);

        _words.splice(passwordIndex, 1);
        setRemainingWords(Array.from(_words));
    }, [difficulty, totalWords]);

    useEffect(() => {
        Utils.buildWordList(difficulty, totalWords, true).then(words => initWords(words));
    }, [difficulty, totalWords, initWords]);

    const clearWord = useCallback((wordIndex: number, word: string) => {
        const isBlock1 = wordIndex < totalWords / 2;
        if (isBlock1) {
            let _block1 = Array.from(block1);
            _block1 = _block1.map((c, i) => c.id === wordIndex ? { id: c.id + 10000 + i, value: '.' } : c);
            setBlock1(_block1);
        } else {
            let _block2 = Array.from(block2);
            _block2 = _block2.map((c, i) => c.id === wordIndex ? { id: c.id + 20000 + i, value: '.' } : c);
            setBlock2(_block2);
        }

        setRemainingWords(rw => {
            return rw.filter(c => c.value !== word);
        });
    }, [block1, block2, totalWords]);

    const checkForSimilarities = useCallback((word: string) => {
        const password = words[passwordIndex].value;

        let _word_index: number = -1;
        words.forEach((w, i) => {
            if (w.value === word) {
                _word_index = i;
            }
        });
        if (_word_index < 0) {
            // not a valid word
            return;
        }

        let similarityCount = 0;
        for(let i = 0; i < difficulty; i++) {
            if(word.charAt(i) === password.charAt(i)) {
                similarityCount++;
            }
        }

        // no longer clearing word on submit - I realised the game version doesn't
        // clearWord(_word_index, word);

        setHistory(h => {
            const _h = Array.from(h);
            _h.push({word, similarity: similarityCount});
            return _h;
        });

        const _tries = tries - 1;
        setTries(_tries);
        if (_tries <= 0) {
            setLose(true);
        }
    }, [difficulty, passwordIndex, words, tries]);

    const debouncedHover = useDebouncedCallback(
        (character: Character) => {
            setHover(character.id);
            if (character.id > 100) {
                // is a code character
                let hack: HackOption | undefined;

                if (usedHacks.some(uh => uh.id === character.id)) {
                    // has already been used for a hack
                    setUserInput(character.value);
                    return;
                }

                if (character.id < 2000) {
                    // block 1
                    hack = Utils.checkIfHackExists(character, block1, 1000);
                } else {
                    // block 2
                    hack = Utils.checkIfHackExists(character, block2, 2000);
                }
                if (hack) {
                    setUserInput(hack.value);
                    setEndHover(hack.indexes[hack.indexes.length - 1]);
                } else {
                    setUserInput(character.value);
                }
            } else {
                // is a word
                setUserInput(words[character.id].value);
            }
        },
        10
    );

    const onHover = useCallback((character: Character) => {
        setEndHover(undefined);
        window.audioManager.playRandomKey(0.01);
        inputRef.current.blur();
        debouncedHover(character);
    }, [debouncedHover]);

    const compareWords = useCallback((word: string) => {
        word = word.toUpperCase();
        if(word === words[passwordIndex].value) {
            // word is correct
            setWin(true);
            window.audioManager.play(SoundCode.shutter, 0.4);
            navigate(SYSTEMS.HOME);
            dispatch(notify("Password accepted..."));
        } else {
            // word is incorrect password
            checkForSimilarities(word);
        }
    }, [words, passwordIndex, checkForSimilarities, dispatch]);

    const submitValue = useCallback((word: string) => {
        if(lose || win) return;
        const wordIndex = words.map(w => w.value).indexOf(word);
        setUserInput('');
        if (wordIndex >= 0) {
            // word exists in words array
            compareWords(word);
        }
    }, [win, lose, words, compareWords]);

    const processHack = useCallback((newHack: UsedHack) => {
        const hackType = Utils.determineHackType();
        setUsedHacks(hacks => [...hacks, newHack]);

        setHistory(h => {
            const _h = Array.from(h);
            _h.push({ id: newHack.id, value: newHack.value, type: hackType });
            return _h;
        });

        switch (hackType) {
            case HackType.RemoveDud: {
                const randomIndex = Math.floor(Math.random() * remainingWords.length);
                const word = remainingWords[randomIndex];
                const wordIndex = words.indexOf(word);
                clearWord(wordIndex, word.value);
                break;
            }
            case HackType.ResetTries: {
                setTries(4);
                break;
            }
        }
    }, [clearWord, remainingWords, words]);

    const onCharClick = useCallback((character: Character) => {
        if (win || lose) return; // prevent actions if game already finished
        window.audioManager.play(SoundCode.key_3, 0.4);

        if (character.id < 100) {
            // is a word
            submitValue(words[character.id].value);
        } else if (usedHacks.some(uh => uh.id === character.id)) {
            // hack character already used
            setHistory(h => {
                const _h = Array.from(h);
                _h.push({ error: character.value });
                return _h;
            });
        } else {
            const value = inputRef.current.value;
            if (value.length > 1) {
                // is a valid hack
                const newHack = {
                    id: character.id,
                    value: value
                }
                setHover(undefined);
                setEndHover(undefined);
                processHack(newHack);
            } else {
                setHistory(h => {
                    const _h = Array.from(h);
                    _h.push({ error: character.value });
                    return _h;
                });
            }
        }
    }, [win, lose, submitValue, words, processHack, usedHacks])

    const historyConsole: React.ReactNode[] = useMemo(() => {
        return history.map(record => {
            if ('word' in record) {
                return (
                    <div key={`history_record_${record.word}`} className='hack-history_records'>
                        <div className='hack-history_record_row'>{record.word}</div>
                        <div className='hack-history_record_row'>Entry denied</div>
                        <div className='hack-history_record_row'>{record.similarity}/{difficulty} correct.</div>
                    </div>
                );
            }
            if ('error' in record) {
                return (
                    <div key={`history_record_${record.error}`} className='hack-history_records'>
                        <div className='hack-history_record_row'>{record.error} Failed.</div>
                    </div>
                );
            }
            return (
                <div key={`history_record_${record.id}`} className='hack-history_records'>
                    <div className='hack-history_record_row'>{record.value}</div>
                    <div className='hack-history_record_row'>{record.type === HackType.ResetTries ? "Tries Reset." : "Dud Removed."}</div>
                </div>
            );
        });
    }, [history, difficulty]);

    const renderHexForColumn = useCallback((column: 1 | 2) => {
        const hex_numbers = [];
        const linePosition = column * _block_lines;
        for (let i = linePosition; i < (linePosition + 16); i++) {
            const hex_number = hex_start_position + (i * 10);
            hex_numbers.push(
                <div key={`hex_num_${i}`}>
                    <div className="hack-hex-char">0</div>
                    <div className="hack-hex-char">x</div>
                    {hex_number.toString(16).split('').map((letter, li) => {
                        return (
                            <div key={`hack-char_${li}`} className="hack-hex-char">
                                {letter}
                            </div>
                        );
                    })}
                </div>
            )
        }
        return hex_numbers;
    }, [hex_start_position])

    const clearHover = useCallback(() => {
        setHover(undefined);
        setEndHover(undefined);
    }, []);

    return(
        <div className="hack screen">
            <Title />
            <div className="hack-title">
                Attempts remaining: {'▊ '.repeat(tries)}
                <Button label="EXIT" onClick={() => navigate(SYSTEMS.LOGIN)} style={{ display: "inline" }} />
            </div>
            <br/>
            <div className="hack-wrapper">
                <div className="hack-box hack-hex_column_one">
                    {renderHexForColumn(1)}
                </div>
                <div className="hack-box hack-block_one">
                    <MemoBlock block={block1} hover={hover} onCharClick={onCharClick} clearHover={clearHover} onHover={onHover} endHover={endHover} />
                </div>
                <div className="hack-box hack-hex_column_two">
                    {renderHexForColumn(2)}
                </div>
                <div className="hack-box hack-block_two" onMouseLeave={clearHover}>
                    <MemoBlock block={block2} hover={hover} onCharClick={onCharClick} clearHover={clearHover} onHover={onHover} endHover={endHover} />
                </div>
                <div className="hack-box hack-console">
                    <div className="hack-console-content">
                        <div className="hack-console-history">
                            {historyConsole}
                            {lose && (
                                <>
                                    {">Locked."}
                                    <br/>
                                    {">Try Again."}
                                </>
                            )}
                        </div>
                        <form className="hack-console-input" onSubmit={e => {
                            e.preventDefault();
                            submitValue(userInput);
                        }}>
                            <span>{'>'}</span>
                            <input
                                maxLength={12}
                                name="user-input"
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={event => setUserInput(event.target.value)}
                                autoComplete="off"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


type BlockProps = {
    block: Character[];
    onCharClick(character: Character): void;
    clearHover(): void;
    onHover(character: Character): void;
    hover?: number;
    endHover?: number;
}

const Block = ({ block, onCharClick, clearHover, onHover, hover, endHover }: BlockProps) => {
    return (
        <div onMouseLeave={clearHover}>
            {block.map((char, i) => {
                return <Letter key={char.id + '' + i} character={char} onHover={onHover} onClick={onCharClick} hover={hover} endHover={endHover} />;
            })}
        </div>
    );
}

const MemoBlock = memo(Block);
