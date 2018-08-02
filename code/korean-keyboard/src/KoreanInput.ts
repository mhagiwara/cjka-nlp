
enum Position { Initial, Middle, Final }

class Jamo {
    key: string;
    hangul: string;
    position: Position;
    index: number;

    constructor(key: string, hangul: string, position: Position, index: number) {
        this.key = key;
        this.hangul = hangul;
        this.position = position;
        this.index = index;
    }
}

export const JAMOS = [
    new Jamo('r', 'ㄱ', Position.Initial, 1),
    new Jamo('R', 'ㄲ', Position.Initial, 2),
    new Jamo('s', 'ㄴ', Position.Initial, 3),
    new Jamo('e', 'ᄃ', Position.Initial, 4),
    new Jamo('E', 'ᄄ', Position.Initial, 5),
    new Jamo('f', 'ᄅ', Position.Initial, 6),
    new Jamo('a', 'ᄆ', Position.Initial, 7),
    new Jamo('q', 'ᄇ', Position.Initial, 8),
    new Jamo('Q', 'ᄈ', Position.Initial, 9),
    new Jamo('t', 'ᄉ', Position.Initial, 10),
    new Jamo('T', 'ᄊ', Position.Initial, 11),
    new Jamo('d', 'ᄋ', Position.Initial, 12),
    new Jamo('w', 'ㅈ', Position.Initial, 13),
    new Jamo('W', 'ㅉ', Position.Initial, 14),
    new Jamo('c', 'ㅊ', Position.Initial, 15),
    new Jamo('z', 'ㅋ', Position.Initial, 16),
    new Jamo('x', 'ㅌ', Position.Initial, 17),
    new Jamo('v', 'ㅍ', Position.Initial, 18),
    new Jamo('g', 'ㅎ', Position.Initial, 19),

    new Jamo('k', 'ㅏ', Position.Middle, 1),
    new Jamo('o', 'ㅐ', Position.Middle, 2),
    new Jamo('i', 'ㅑ', Position.Middle, 3),
    new Jamo('O', 'ㅒ', Position.Middle, 4),
    new Jamo('j', 'ㅓ', Position.Middle, 5),
    new Jamo('p', 'ㅔ', Position.Middle, 6),
    new Jamo('u', 'ㅕ', Position.Middle, 7),
    new Jamo('P', 'ㅖ', Position.Middle, 8),
    new Jamo('h', 'ㅗ', Position.Middle, 9),
    new Jamo('hk', 'ㅘ', Position.Middle, 10),
    new Jamo('ho', 'ㅙ', Position.Middle, 11),
    new Jamo('hl', 'ㅚ', Position.Middle, 12),
    new Jamo('y', 'ㅛ', Position.Middle, 13),
    new Jamo('n', 'ㅜ', Position.Middle, 14),
    new Jamo('nj', 'ㅝ', Position.Middle, 15),
    new Jamo('np', 'ㅞ', Position.Middle, 16),
    new Jamo('nl', 'ㅟ', Position.Middle, 17),
    new Jamo('b', 'ㅠ', Position.Middle, 18),
    new Jamo('m', 'ㅡ', Position.Middle, 19),
    new Jamo('ml', 'ㅢ', Position.Middle, 20),
    new Jamo('l', 'ㅣ', Position.Middle, 21),

    new Jamo('r', 'ㄱ', Position.Final, 1),
    new Jamo('R', 'ㄲ', Position.Final, 2),
    new Jamo('rt', 'ᆪ', Position.Final, 3),
    new Jamo('s', 'ㄴ', Position.Final, 4),
    new Jamo('sw', 'ᆬ', Position.Final, 5),
    new Jamo('sg', 'ᆭ', Position.Final, 6),
    new Jamo('e', 'ㄷ', Position.Final, 7),
    new Jamo('f', 'ㄹ', Position.Final, 8),
    new Jamo('fr', 'ᆰ', Position.Final, 9),
    new Jamo('fa', 'ᆱ', Position.Final, 10),
    new Jamo('fq', 'ᆲ', Position.Final, 11),
    new Jamo('ft', 'ᆳ', Position.Final, 12),
    new Jamo('fx', 'ᆴ', Position.Final, 13),
    new Jamo('fv', 'ᆵ', Position.Final, 14),
    new Jamo('fg', 'ᆶ', Position.Final, 15),
    new Jamo('a', 'ㅁ', Position.Final, 16),
    new Jamo('q', 'ㅂ', Position.Final, 17),
    new Jamo('qt', 'ᆹ', Position.Final, 18),
    new Jamo('t', 'ㅅ', Position.Final, 19),
    new Jamo('T', 'ㅆ', Position.Final, 20),
    new Jamo('d', 'ㅇ', Position.Final, 21),
    new Jamo('w', 'ㅈ', Position.Final, 22),
    new Jamo('c', 'ㅊ', Position.Final, 23),
    new Jamo('z', 'ㅋ', Position.Final, 24),
    new Jamo('x', 'ㅌ', Position.Final, 25),
    new Jamo('v', 'ㅍ', Position.Final, 26),
    new Jamo('g', 'ㅎ', Position.Final, 27),
];


class Syllable {
    initial: Jamo | null;
    middle: Jamo | null;
    final: Jamo | null;

    constructor(initial: Jamo | null, middle: Jamo | null, final: Jamo | null) {
        this.initial = initial;
        this.middle = middle;
        this.final = final;
    }

    render(): string {
        // render to a Hangul character
        if (this.initial && this.middle) {
            let charCode = 588 * (this.initial.index - 1) + 28 * (this.middle.index - 1) + 44032;
            if (this.final)
                charCode += this.final.index;
            return String.fromCharCode(charCode)
        } else {
            let jamo: Jamo | null = this.initial || this.middle || this.final;
            if (!jamo)
                return '';
            return jamo.hangul;
        }
    }
}

function findFirstMatches(input: string): Jamo[] {
    // Given a string, returns an array of Jamos that match the prefixes of the string
    let results: Jamo[] = [];
    JAMOS.forEach(function (jamo) {
        if (input.slice(0, jamo.key.length) === jamo.key) {
            results.push(jamo);
        }
    });

    return results;
}

function segmentJamos(input: string): Jamo[][] {
    let results: Jamo[][] = [];

    if (!input) return [[]];

    let matches = findFirstMatches(input);
    matches.forEach(function (match) {
        let suffix = input.slice(match.key.length);
        let suffixResults = segmentJamos(suffix);
        suffixResults.forEach(function (jamos) {
            let newJamos = [match].concat(jamos);
            results.push(newJamos);
        });
    });

    return results;
}

function segmentSyllables(jamos: Jamo[]): Syllable[] {
    let syllable: Syllable | null = null;
    let results: Syllable[] = [];
    jamos.forEach(function (jamo) {
        if (jamo.position === Position.Initial) {

            if (syllable) results.push(syllable);
            syllable = new Syllable(jamo, null, null);

        } else if (jamo.position === Position.Middle) {

            if (syllable && syllable.initial && !syllable.middle) {
                syllable.middle = jamo;
            } else {
                if (syllable) results.push(syllable);
                syllable = new Syllable(null, jamo, null);
            }

        } else if (jamo.position === Position.Final) {
            if (syllable && syllable.initial && syllable.middle && !syllable.final) {
                syllable.final = jamo;
            } else {
                if (syllable) results.push(syllable);
                syllable = new Syllable(null, null, jamo);
            }
        }
    });

    if (syllable) results.push(syllable);
    return results;
}

export function convert(input: string): string {
    let jamoSequences: Jamo[][] = segmentJamos(input);
    let shortestSyllables: Syllable[] = [];
    let shortestSyllablesLength = Number.MAX_SAFE_INTEGER;

    jamoSequences.forEach(function (jamos) {
        let syllables: Syllable[] = segmentSyllables(jamos);
        if (syllables.length < shortestSyllablesLength) {
            shortestSyllables = syllables;
            shortestSyllablesLength = syllables.length;
        }
    });

    return shortestSyllables.map(syl => syl.render()).join('');
}
