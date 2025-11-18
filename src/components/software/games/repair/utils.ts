export type RepairCharacter = {
    id: number;
    value: string;
    isError: boolean;
}

export type ErrorCharacter = {
    id: number;
    value: string;
    x: number;
    y: number;
}

const errorCount = 8;

export default class RepairUtils {
    static buildLine(characterCount: number): RepairCharacter[]
    {
        const characters: RepairCharacter[] = [];
        const code = '!`@#$%`^&*((`))<<>>{{`}}[[]];`:",/`\\-_=`+';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '1234567890';
        const characterOptions = code + letters + numbers;
        for (let i = 0; i < characterCount; i++) {
            characters.push({
                id: i,
                value: characterOptions.charAt(Math.floor(Math.random() * characterOptions.length)),
                isError: false,
            });
        }
        return characters;
    }

    static buildLines(lineCount: number, characterCount: number) {
        const lines: RepairCharacter[][] = [];
        for (let i = 0; i < lineCount; i++) {
            lines.push(this.buildLine(characterCount));
        }
        const errors = this.assignRandomErrors(lines, errorCount, lineCount, characterCount);
        return { lines, errors };
    }

    static assignRandomErrors(lines: RepairCharacter[][], errorCount: number, lineCount: number, characterCount: number) {
        const totalChars = lineCount * characterCount;
        const errorIndices = new Set<number>();

        while (errorIndices.size < errorCount) {
            errorIndices.add(Math.floor(Math.random() * totalChars));
        }

        const errors: ErrorCharacter[] = [];
        errorIndices.forEach(index => {
            const lineIndex = Math.floor(index / characterCount);
            const charIndex = index % characterCount;
            lines[lineIndex][charIndex].isError = true;
            errors.push({
                id: lines[lineIndex][charIndex].id,
                value: lines[lineIndex][charIndex].value,
                x: charIndex,
                y: lineIndex,
            });
        });

        return errors;
    }

    static doesColumnHaveError(column: number, lines: RepairCharacter[][]): boolean {
        for (const line of lines) {
            if (column < line.length) {
                if (line[column].isError) {
                    return true;
                }
            }
        }

        return false;
    }

    static randomIntFromInterval(min: number, max: number): number
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}
