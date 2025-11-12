import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {key_2, key_3, error, shutter, tick, playRandomAudio, playRandomKey, playAudio} from 'helpers/sounds';
import Utils, {Character, WordOption, HackOption} from './utils';
import './styles.scss';
import {Sequencer} from 'components';
import {Title} from 'components/software/elements';
import {Letter} from "./letter";
import * as Util from "util";
import {useDebouncedCallback} from "use-debounce";

type History = {
    word: string;
    similarity: number;
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
    const [words1, setWords1] = useState<WordOption[]>([]);
    const [words2, setWords2] = useState<WordOption[]>([]);
    const [tries, setTries] = useState(4);
    const [words, setWords] = useState<WordOption[]>([]);
    const [passwordIndex, setPasswordIndex] = useState(0);
    const [word, setWord] = useState('');
    const [similarity, setSimilarity] = useState(-1);
    const [remainingWords, setRemainingWords] = useState<WordOption[]>([]);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);
    const [history, setHistory] = useState<History[]>([]);
    const [hover, setHover] = useState<number>();
    const [endHover, setEndHover] = useState<number>();
    const [hacks, setHacks] = useState<string[]>([]);
    const [usedHacks, setUsedHacks] = useState<(string | number)[]>([]);

    const [userInput, setUserInput] = useState('');
    const inputRef = useRef<any>();

    useEffect(() => {
        let timer: any;
        const playTick = (index: number) => {
            if (index < 40) {
                timer = setTimeout(() => {
                    playAudio(tick, 0.01);
                    playTick(index + 1);
                }, 60);
            }
        };
        setTimeout(() => playTick(0), 500);

        return () => clearTimeout(timer);
    }, []);

    const hex_start_position = useMemo(() => Utils.randomIntFromInterval(4096, 61440), []); // HEX: 1000 - f000

    const initWords = useCallback((words: string[]) => {
        const _block1 = Utils.randomCharacters(_block_length, 1000);
        const _block2 = Utils.randomCharacters(_block_length, 2000);

        let passwordIndex = Math.floor(Math.random() * (totalWords));

        let randomPositionsOne = Utils.buildRandomWordPositions(_block_length, difficulty, totalWords / 2);
        let randomPositionsTwo = Utils.buildRandomWordPositions(_block_length, difficulty, totalWords / 2);

        let _column1: WordOption[] = [];
        let _column2: WordOption[] = [];
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

        let _words = [..._column1, ..._column2];

        setWords(Array.from(_words));
        setWords1(_column1);
        setWords2(_column2);
        setPasswordIndex(passwordIndex);
        setBlock1(_block1);
        setBlock2(_block2);
        setRemainingWords(_words.splice(passwordIndex, 1));
    }, [difficulty, totalWords]);

    useEffect(() => {
        Utils.buildWordList(difficulty, totalWords, true).then(words => initWords(words));
    }, [difficulty, totalWords, initWords]);

    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(!prevState.win && this.state.win) {
    //         this.setHistory(['Login Granted', 'Welcome...']);
    //         this.props.finish(true);
    //         playAudio(shutter);
    //     } else if(!prevState.lose && this.state.lose) {
    //         this.setHistory(['Access Denied', '~~~Locked!~~~']);
    //         playAudio(error, 1);
    //         this.props.finish(false);
    //     }
    // }
    //
    // setHistory(statements) {
    //     let history = this.state.history;
    //     history.push(
    //         <div key={`history_record_result`} className='hack-history_records'>
    //             {statements.map((item, i) => {
    //                 return <div key={`record_${i}`} className='hack-history_record_row'>{item}</div>
    //             })}
    //         </div>
    //     );
    //     this.setState({history});
    // }
    //
    //
    // inputWord() {
    //     const word = this.state.word.trim();
    //     if(!word) {
    //         return;
    //     }
    //     this.compareWords(word);
    // }
    //

    //
    // removeWord(word) {
    //     let index = 0;
    //     let block_num = 0;
    //     this.state.words_one.forEach(w => {
    //         if(w.value === word) {
    //             index = w.position;
    //             block_num = 1;
    //         }
    //     });
    //     this.state.words_two.forEach(w => {
    //         if(w.value === word) {
    //             index = w.position;
    //             block_num = 2;
    //         }
    //     });
    //     let block = block_num === 1 ? this.state.block_one : this.state.block_two;
    //     for(let i = index; i < index + this.word_length; i++) {
    //         block[i].id = 99;
    //         block[i].value = '.';
    //     }
    //
    //     if(block_num === 1) this.setState({block_one: block});
    //     else this.setState({block_two: block})
    // }

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

        console.log(_word_index, _word_index < totalWords / 2);
        let isBlock1 = _word_index < totalWords / 2;
        if (isBlock1) {
            let _block1 = Array.from(block1);
            _block1 = _block1.map(c => c.id === _word_index ? { ...c, value: '.' } : c);
            setBlock1(_block1);
        } else {
            let _block2 = Array.from(block2);
            _block2 = _block2.map(c => c.id === _word_index ? { ...c, value: '.' } : c);
            setBlock2(_block2);
        }

        setRemainingWords(rw => {
            let _result = Array.from(rw);
            let _word_index = _result.map(w => w.value).indexOf(word);
            _result.splice(_word_index, 1);
            return _result;
        });

        setHistory(h => {
            let _h = Array.from(h);
            _h.push({word, similarity: similarityCount});
            return _h;
        });

        let _tries = tries - 1;
        setTries(_tries);
        if (_tries <= 0) {
            setLose(true);
        }
    }, [block1, block2, difficulty, passwordIndex, words, totalWords, tries]);

    // onChange(event) {
    //     let word = event.target.value;
    //     if(!event) {
    //         return;
    //     }
    //     this.setState(prevState => {
    //         return {
    //             ...prevState, word
    //         }
    //     });
    // }
    //
    // getInputBasedOnChar(char, block, block_index) {
    //     if(char.id >= 99) {
    //         return '.';
    //     } else if(char.id > -1) {
    //         let words = [...this.state.words_one, ...this.state.words_two];
    //         // this.setState({word: words[char.id].value});
    //         return words[char.id].value;
    //     } else {
    //         return Utils.checkIfHackExists(char, block, block_index);
    //     }
    // }

    const checkHoverValue = useCallback((character: Character) => {
        if (typeof hover === 'number') {
            if (typeof endHover === 'number') {
                return character.id >= hover && character.id <= endHover;
            }
            return character.id === hover;
        }
    }, [hover, endHover]); // todo: usedHacks


    const updateHover = useCallback((char: Character, block_index: number) => {
        // if (typeof char.id === 'string') {
        //     if(block_index + "" === char.id.split('-')[0]) {
        //         setHover(char.id);
        //     } else {
        //         setHover(undefined);
        //     }
        // } else if (char.id >= 0) {
        //     setUserInput(words[char.id].value);
        //     setHover(char.id);
        // } else {
        //     setUserInput(char.value);
        //     setHover(char.id);
        // }
    }, [words]);

    // const onCharHover = useCallback((char: Character, block: Character[], block_index: number, key: 'block1' | 'block2') => {
    //     playRandomKey(0.01);
    //     inputRef.current.blur();
    //
    //     if (char.id < 0) {
    //
    //     } else {
    //
    //     }
    //
    //     let hack: HackOption | undefined = Utils.checkIfHackExists(char, block, block_index);
    //     if(hack) {
    //         setHacks(h => {
    //             if (!hack) {
    //                 return h;
    //             }
    //             const _hacks = Array.from(h);
    //             if(_hacks.indexOf(hack.value) < 0) {
    //                 _hacks.push(hack.value);
    //             }
    //             let hack_code = '';
    //             const _block = Array.from(block);
    //             hack.indexes.forEach(v => {
    //                 _block[v].id = hack ? hack.value : -1;
    //                 hack_code += block[v].value;
    //             });
    //             setUserInput(hack_code);
    //             if (key === 'block1') {
    //                 setBlock1(_block);
    //             } else {
    //                 setBlock2(_block);
    //             }
    //             updateHover(char, block_index);
    //             return _hacks;
    //         });
    //     } else {
    //         updateHover(char, block_index);
    //     }
    // }, [updateHover]);

    const debouncedHover = useDebouncedCallback(
        (character: Character) => {
            // setHover(character.id);
            if (character.id > 100) {
                // is a code character
                let hack: HackOption | undefined;
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
        25
    );

    const onHover = useCallback((character: Character) => {
        playRandomKey(0.01);
        inputRef.current.blur();
        debouncedHover(character);
    }, [debouncedHover]);

    // setInputValue(value) {
    //     if(value.value) {
    //         if(typeof value.id !== 'string') {
    //             if(value.id > -1 && value.id < 99) {
    //                 let words = [...this.state.words_one, ...this.state.words_two];
    //                 this.setState({word: words[value.id].value});
    //             } else {
    //                 this.setState({word: value.value});
    //             }
    //         }
    //     } else {
    //         this.setState({word: value});
    //     }
    // }

    const compareWords = useCallback((word: string) => {
        word = word.toUpperCase();
        if(word === words[passwordIndex].value) {
            // word is correct
            setWin(true);
        } else {
            // word is not password
            checkForSimilarities(word);
        }
    }, [words, passwordIndex, checkForSimilarities, tries]);

    const submitValue = useCallback((word: string) => {
        if(lose || win) return;
        const validWord = words.map(w => w.value).indexOf(word);
        setUserInput('');
        if (validWord) {
            compareWords(word);
        } else {
            // lookupHack(); // todo: build hack checker
        }
    }, [win, lose, words, compareWords]);

    const onCharClick = useCallback((character: Character) => {
        if(win || lose) return; // prevent actions if game already finished

        // check if word or hack
        // otherwise count as bad attempt

        // if word - call submitValue
        // if not - remove word from field - reduce attempts (if attempts 0 and not win - then lose)

        // if hack - check what type - act according

        // add action to console history

        if (character.id < 100) {
            // is a word
            submitValue(words[character.id].value);
        } else {
            // is a character / hack

        }


        // let value = this.getInputBasedOnChar(char, block, block_index);
        //
        // // set the value if word - use if hack
        // if(value && value.result) {
        //     let used_hacks = this.state.used_hacks;
        //     if(used_hacks.indexOf(value.result) < 0) {
        //         used_hacks.push(value.result);
        //         let history = [...this.state.history];
        //         let code = Utils.concatValuesFromArrays(value.values, block);
        //         let reset_tries = Utils.isClearTries();
        //         history.push(
        //             <div key={`history_record_${value.result}`} className='hack-history_records'>
        //                 <div className='hack-history_record_row'>{code}</div>
        //                 <div className='hack-history_record_row'>{ reset_tries ? 'Tries Reset.' : 'Dud Removed.'}</div>
        //             </div>
        //         );
        //         if(reset_tries) {
        //             this.setState({used_hacks, history, tries: 4});
        //         } else {
        //             this.setState({used_hacks, history});
        //             let random_word = this.state.remaining_words[Utils.getRandom(this.state.remaining_words.length - 1)].value;
        //             this.removeWord(random_word);
        //         }
        //     } else {
        //         this.setState({word: block[block_index].value});
        //     }
        // } else {
        //     if(this.state.word === value) {
        //         this.submitValue();
        //     } else this.setState({word: value});
        // }
    }, [win, lose, submitValue, words])

    const historyConsole = useMemo(() => {
        return history.map(record => {
            return (
                <div key={`history_record_${record.word}`} className='hack-history_records'>
                    <div className='hack-history_record_row'>{record.word}</div>
                    <div className='hack-history_record_row'>Entry denied</div>
                    <div className='hack-history_record_row'>{record.similarity}/{difficulty} correct.</div>
                </div>
            );
        });
    }, [history, difficulty]);

    const renderHexForColumn = useCallback((column: 1 | 2) => {
        let hex_numbers = [];
        const linePosition = column * _block_lines;
        for(let i = linePosition; i < (linePosition + 16); i ++) {
            let hex_number = hex_start_position + (i * 10);
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

    console.log(block1);

    const renderBlock = useMemo(() => (block: Character[]) => {
        return block.map((char, i) => {
            return <Letter key={char.id + '' + i} character={char} onHover={onHover} onClick={onCharClick} onLeave={clearHover} />;
        });
    }, [clearHover, onHover, onCharClick]);

    return(
        <div className="hack screen">
            <Title />
            Attempts remaining: {'▊ '.repeat(tries)}
            <br/>
            <br/>
            <div className="hack-wrapper">
                <div className="hack-box hack-hex_column_one">
                    {renderHexForColumn(1)}
                </div>
                <div className="hack-box hack-block_one">
                    <MemoBlock block={block1} hover={hover} onCharClick={onCharClick} clearHover={clearHover} onHover={onHover} />
                </div>
                <div className="hack-box hack-hex_column_two">
                    {renderHexForColumn(2)}
                </div>
                <div className="hack-box hack-block_two" onMouseLeave={clearHover}>
                    <MemoBlock block={block2} hover={hover} onCharClick={onCharClick} clearHover={clearHover} onHover={onHover} />
                </div>
                <div className="hack-box hack-console">
                    {/*<div className="hack-box hack-console" {...this.console}>*/}
                    <div className="hack-console-content">
                        <div className="hack-console-history">
                            {historyConsole}
                        </div>
                        {hover}
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
}

const Block = ({block, onCharClick, clearHover, onHover, hover}: BlockProps) => {
    return (
        <>
            {block.map((char, i) => {
                return <Letter key={char.id + '' + i} character={char} onHover={onHover} onClick={onCharClick} onLeave={clearHover} hover={hover} />;
            })}
        </>
    );
}

const MemoBlock = memo(Block);
