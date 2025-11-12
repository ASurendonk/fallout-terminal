import rw from 'random-word-by-length';

export type Character = {
    id: number;
    value: string;
}
export type WordOption = {
    value: string;
    position: number;
}
export type HackOption = {
    value: string;
    indexes: number[];
}

export default class Utils {
    static randomCharacters(length: number, block: 1000 | 2000): Character[]
    {
        let text: Character[] = [];
        const code = '~!`@#$%`^&*((`))<<>>{{`}}[[]];`:",/`\\-_=`+';
        for (let i = 0; i < length; i++)
            text.push({ id: block + i, value: code.charAt(Math.floor(Math.random() * code.length)) });
        return text;
    }

    static randomIntFromInterval(min: number, max: number): number
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    static shuffleArray(array: any[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // static randomHexadecimal() {
    //     let number = Math.floor(Math.random() * 16);
    //     return number.toString(16);
    // }

    static buildRandomWordPositions(block_length: number, word_length: number, total_positions: number) {
        let positions = [];
        let value = this.randomIntFromInterval(0, block_length - (word_length + 1));
        positions.push(value);

        while(positions.length < total_positions) {
            let value = this.randomIntFromInterval(0, block_length - (word_length + 1));
            let valid_value = true;
            positions.map(pos => {
                if(value > pos + word_length + 1 || value + word_length + 1 < pos) {
                    // is valid
                } else {
                    valid_value = false
                }
                return null;
            });
            if(valid_value) {
                positions.push(value);
            }
        }

        return positions;
    }

    static checkValidHackValue(v: string) {
        let startHackValues = ['[','{','(','<'];
        let endHackValues = [']','}',')','>'];
        let index = startHackValues.indexOf(v);
        if(index > -1) {
            return endHackValues[index];
        } else
            return false;
    }

    static checkIfHackExists(char: Character, block: Character[], idOffset: number): HackOption | undefined {
        if (!'<{[('.includes(char.value)) {
            return; // value is not a possible hack
        }
        let block_index = char.id - idOffset;
        let row_index = block_index % 12;
        let endingHackValue = Utils.checkValidHackValue(char.value);
        if(12 - row_index > 0) {
            let value = '';
            let indexes = [];
            for(let i = 0; i < 12 - row_index; i++) {
                let _indexToCheck = block_index + i;
                let _current_value = block[_indexToCheck].value;
                if(block[_indexToCheck].id < 100) break;
                value += _current_value;
                indexes.push(block[_indexToCheck].id);
                if(_current_value === endingHackValue) {
                    return { value, indexes };
                }
            }
        }
    }

    // static concatValuesFromArrays(indexes, block) {
    //     if(indexes && block) {
    //         let value = '';
    //         indexes.forEach(i => {
    //             value += block[i].value;
    //         });
    //         return value;
    //     }
    // }
    //
    // static isClearTries() {
    //     let val = Math.floor(Math.random() * 5) + 1;
    //     return val === 1;
    // }
    //
    // static getRandom(n) {
    //     return Math.floor(Math.random() * n) + 1;
    // }

    static checkSimilarity(first: string, second: string) {
        let similarityCount = 0;
        for(let i = 0; i < first.length; i++) {
            if(first.charAt(i) === second.charAt(i)) {
                similarityCount ++;
            }
        }
        return similarityCount;
    }

    static getWord(word_length: number) {
        let new_word = '';
        let loop_limit = 100;
        while((new_word.length < word_length || new_word.length > word_length) && loop_limit > 0) {
            new_word = rw(word_length);
            loop_limit--;
        }
        if(loop_limit < 1) console.error('Loop limit reached! getWord()');
        return new_word.toUpperCase();
    }

    static getSimilarWord(word: string, similarity: number) {
        // console.log('GSW');
        if(word.length < similarity) return null;
        let new_word = '';
        let loop_limit = 1000;
        while((new_word.length < word.length || new_word.length > word.length) && loop_limit > 0) {
            // console.log('GSW-LEN-LEN');
            new_word = rw(word.length);
            if(this.checkSimilarity(word, new_word.toUpperCase()) !== similarity) new_word = '';
            loop_limit--;
        }
        if(loop_limit < 1) {
            // console.error('Loop limit reached! getSimilarWord()');
            let settled_word = '------';
            for(let i = 0; i < 10; i++) {
                settled_word = rw(word.length);
                if(settled_word.length === word.length) break;
            }
            return settled_word.toUpperCase();
        } else {
            return new_word.toUpperCase();
        }
    }

    static async buildWordList(word_length: number, total_words: number, shuffled?: boolean) {
        const initialWord = Utils.getWord(word_length);
        const words = [initialWord];

        let similarities = [];
        switch(word_length) {
            case 4 : similarities = [1,1,1,2,2,2,3,3,3,3,3]; break;
            case 6 : similarities = [2,2,2,3,3,3,4,4,4,5,5]; break;
            default : similarities = [1,1,1,2,2,2,3,3,3,3,3]; break;
        }

        let loop_limit = 100;
        while(words.length < total_words && loop_limit > 0) {
            let new_word = Utils.getSimilarWord(initialWord, similarities[words.length - 1]);
            if(new_word && words.indexOf(new_word) < 0) {
                words.push(new_word);
            }
            loop_limit--;
        }
        if(loop_limit < 1) console.error('Loop limit reached! initWords()');

        if (shuffled) return this.shuffleArray(words);
        else return words;
    }
}