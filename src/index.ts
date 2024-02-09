export { RuneTranslator, Token };
import { IGNORE_DIGRAPHS_TEMPLATES } from './digraphs';

const VS14 = '\uFE0D';

const FEOH = '\u16A0';
const URUZ = '\u16A2';
const YR = '\u16A3';
const THORN = '\u16A6';
const ANSUZ = '\u16A8';
const OS = '\u16A9';
const AC = '\u16AA';
const AESC = '\u16AB';
const RAIDO = '\u16B1';
const KAUNA = '\u16B2';
const CEN = '\u16B3';
const KAUN = '\u16B4';
const GEBO = '\u16B7';
const GAR = '\u16B8';
const WYNN = '\u16B9';
const HAGLAZ = '\u16BA';
const HAEGL = '\u16BB';
const HAGALL = '\u16BC';
const NAUDIZ = '\u16BE';
const ISAZ = '\u16C1';
const JERAN = '\u16C3';
const GER = '\u16C4';
const PEORTH = '\u16C8';
const ALGIZ = '\u16C9';
const SOWILO = '\u16CA';
const SIGEL = '\u16CB';
const TYR = '\u16CF';
const BEORC = '\u16D2';
const OPEN_P = '\u16D5';
const EHWAZ = '\u16D6';
const MANNAZ = '\u16D7';
const LAUKAZ = '\u16DA';
const ING = '\u16DD';
const DAGAZ = '\u16DE';
const ETHEL = '\u16DF';
const EAR = '\u16E0';
const IOR = '\u16E1';
const CALC = '\u16E3';
const STAN = '\u16E5';

const TOLKIEN_K = '\u16F1';
const TOLKIEN_SH = '\u16F2';
const TOLKIEN_OO = '\u16F3';

const SOSARIAN_V = `${URUZ}${VS14}`;

const OPHIDIAN_A = '\uE5E2';
const OPHIDIAN_B = '\uE5E3\uE5E1';
const OPHIDIAN_C = '\uE5E1\uE5E3';
const OPHIDIAN_D = '\uE5E0';
const OPHIDIAN_E = '\uE5E4';
const OPHIDIAN_F = '\uE5E7\uE5E5';
const OPHIDIAN_G = '\uE5E5\uE5E7';
const OPHIDIAN_H = '\uE5E6';
const OPHIDIAN_I = '\uE5E5\uE5E5';
const OPHIDIAN_J = '\uE5E3\uE5E3';
const OPHIDIAN_K = '\uE5E1\uE5E1';
const OPHIDIAN_L = '\uE5E7\uE5E7';
const OPHIDIAN_M = '\uE5EA';
const OPHIDIAN_N = '\uE5EB\uE5E9';
const OPHIDIAN_O = '\uE5E9\uE5EB';
const OPHIDIAN_P = '\uE5E8';
const OPHIDIAN_Q = '\uE5EC';
const OPHIDIAN_R = '\uE5EF\uE5ED';
const OPHIDIAN_S = '\uE5ED\uE5EF';
const OPHIDIAN_T = '\uE5EE';
const OPHIDIAN_U = '\uE5ED\uE5ED';
const OPHIDIAN_V = '\uE5EB\uE5EB';
const OPHIDIAN_W = '\uE5E9\uE5E9';
const OPHIDIAN_X = '\uE5EF\uE5EF';
const OPHIDIAN_Y = '\uE5F1';
const OPHIDIAN_Z = '\uE5F0';
const OPHIDIAN_COMMA = '\uE5FE';
const OPHIDIAN_PERIOD = '\uE5FF';

const BASIC_RUNE_MAP: Map<string, string> = new Map<string, string>([
    ['A', AESC],
    ['B', BEORC],
    ['C', CEN],
    ['D', DAGAZ],
    ['E', EHWAZ],
    ['F', FEOH],
    ['G', GEBO],
    ['H', HAEGL],
    ['I', ISAZ],
    ['J', GER],
    ['K', TOLKIEN_K],
    ['L', LAUKAZ],
    ['M', MANNAZ],
    ['N', NAUDIZ],
    ['O', OS],
    ['P', OPEN_P],
    ['Q', KAUN],
    ['R', RAIDO],
    ['S', SIGEL],
    ['T', TYR],
    ['U', URUZ],
    ['V', SOSARIAN_V],
    ['W', WYNN],
    ['X', CALC],
    ['Y', YR],
    ['Z', ALGIZ],

    ["'", ''],
    ['-', '᛫'],
]);

const SOSARIAN_RUNE_MAP: Map<string, string> = new Map<string, string>([
    ...BASIC_RUNE_MAP,
    // Swap W and H
    ['H', WYNN],
    ['W', HAEGL],
    // Add digraphs
    ['EE', ING],
    ['NG', ETHEL],
    ['ST', STAN],
    ['TH', THORN],
    ['EA', EAR],
]);

const NOVIAN_RUNE_MAP: Map<string, string> = new Map<string, string>([
    ...BASIC_RUNE_MAP,
    ['J', IOR],
    ['K', KAUNA],
    ['P', PEORTH],
    ['S', SOWILO],
]);

const OPHIDIAN_RUNE_MAP: Map<string, string> = new Map<string, string>([
    ['A', OPHIDIAN_A],
    ['B', OPHIDIAN_B],
    ['C', OPHIDIAN_C],
    ['D', OPHIDIAN_D],
    ['E', OPHIDIAN_E],
    ['F', OPHIDIAN_F],
    ['G', OPHIDIAN_G],
    ['H', OPHIDIAN_H],
    ['I', OPHIDIAN_I],
    ['J', OPHIDIAN_J],
    ['K', OPHIDIAN_K],
    ['L', OPHIDIAN_L],
    ['M', OPHIDIAN_M],
    ['N', OPHIDIAN_N],
    ['O', OPHIDIAN_O],
    ['P', OPHIDIAN_P],
    ['Q', OPHIDIAN_Q],
    ['R', OPHIDIAN_R],
    ['S', OPHIDIAN_S],
    ['T', OPHIDIAN_T],
    ['U', OPHIDIAN_U],
    ['V', OPHIDIAN_V],
    ['W', OPHIDIAN_W],
    ['X', OPHIDIAN_X],
    ['Y', OPHIDIAN_Y],
    ['Z', OPHIDIAN_Z],

    ['.', OPHIDIAN_PERIOD],
    [',', OPHIDIAN_COMMA],
]);

interface Token {
    type: 'word' | 'space' | 'punctuation' | 'unknown';
    value: string;
}

const TOKEN_REGEXP = /([A-Z0-9'-]+)|(\s*[\-,.:;!?]\s*)|(\s+)/gi;

function scan(value: string, regex: RegExp) {
    if (!regex.global) throw new Error('Scanning must be done with a global regex');
    let match;
    const result = [];
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = regex.exec(value))) {
        result.push(match);
    }
    return result;
}

const TOKEN_TYPES = ['word', 'punctuation', 'space'];

class RuneTranslator {
    private wordMap: Map<string, string>;
    private runeMap: Map<string, string>;

    private runeRegexp: RegExp;

    constructor(runeMap: Map<string, string>, wordMap: Map<string, string> | string[]) {
        this.runeMap = runeMap;

        this.runeRegexp = new RegExp(
            Array.from(this.runeMap.keys())
                .sort((key1, key2) => key2.length - key1.length)
                .map((key) => `${key}`)
                .join('|') + '|w',
            'gi',
        );

        if (wordMap instanceof Map) {
            this.wordMap = wordMap;
        } else {
            const sepRegexp = /\:/g;
            this.wordMap = new Map<string, string>(
                wordMap.map((template) => [
                    template.replace(sepRegexp, '').toLowerCase(),
                    RuneTranslator.doTranslateWord(template, this.runeRegexp, this.runeMap).replace(sepRegexp, ''),
                ]),
            );
        }

        this.trimEndToken = (token) => ['space', 'punctuation'].includes(token?.type);
        this.trimStartToken = (token) => ['space', 'punctuation'].includes(token?.type);

        this.translateSpace = (token) => '᛫';
        this.translatePunctuation = (token) => '᛫᛫';
    }

    public static sosarian() {
        return new RuneTranslator(SOSARIAN_RUNE_MAP, IGNORE_DIGRAPHS_TEMPLATES);
    }

    public static novian() {
        return new RuneTranslator(NOVIAN_RUNE_MAP, new Map());
    }

    public static ophidian() {
        let translator = new RuneTranslator(OPHIDIAN_RUNE_MAP, new Map());
        translator.translateSpace = (token) => token;
        translator.translatePunctuation = (token) => {
            return token.replace(/[\,\.\!\?\:\;]/g, function(match, offset, string, groups) {
                switch(match) {
                case '.':
                case '!':
                case '?':
                case ':':
                    return OPHIDIAN_PERIOD;
                case ',':
                case ';':
                    return OPHIDIAN_COMMA;
                default:
                    return match
                }
            });
        };
        translator.trimEndToken = (token) => ['space'].includes(token?.type);
        translator.trimEndToken = (token) => ['space'].includes(token?.type);
        return translator;
    }

    private trimStartToken: (token: Token) => boolean;
    private trimEndToken: (token: Token) => boolean;

    private translateSpace: (value: string) => string;
    private translatePunctuation: (value: string) => string;

    translate(input: string): string {
        const tokens = this.splitWords(input);

        // Remove leading/trailing space or punctuation
        while (this.trimEndToken(tokens[tokens.length - 1])) {
            tokens.pop();
        }
        while (this.trimStartToken(tokens[0])) {
            tokens.shift();
        }

        return tokens
            .map((token) => {
                switch (token.type) {
                    case 'word':
                        return this.translateWord(token.value);
                    case 'space':
                        return this.translateSpace(token.value);
                    case 'punctuation':
                        return this.translatePunctuation(token.value);
                    default:
                        return token.value;
                }
            })
            .join('');
    }

    public translateWord(word: string): string {
        const newLocal = this.wordMap.get(word.toLowerCase());
        return newLocal ?? RuneTranslator.doTranslateWord(word, this.runeRegexp, this.runeMap);
    }

    private static doTranslateWord(word: string, regexp: RegExp, runeMap: Map<string, string>): string {
        return word.replace(regexp, (match) => runeMap.get(match.toUpperCase()) ?? match);
    }

    public splitWords(input: string): Token[] {
        return scan(input, TOKEN_REGEXP).map((match) => {
            for (let i = 0; i < TOKEN_TYPES.length; i++) {
                if (match[i + 1]) {
                    return {
                        type: TOKEN_TYPES[i],
                        value: match[i + 1],
                    } as Token;
                }
            }
            return {
                type: 'unknown',
                value: match[0],
            } as Token;
        });
    }
}
