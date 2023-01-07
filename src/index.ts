
export {RuneTranslator}

const VS14 =   "\uFE0D"

const FEOH =   "\u16A0"
const URUZ =   "\u16A2"
const YR =     "\u16A3"
const THORN =  "\u16A6"
const ANSUZ =  "\u16A8"
const OS =     "\u16A9"
const AC =     "\u16AA"
const AESC =   "\u16AB"
const RAIDO =  "\u16B1"
const KAUNA =  "\u16B2"
const CEN =    "\u16B3"
const KAUN =   "\u16B4"
const GEBO =   "\u16B7"
const GAR =    "\u16B8"
const WYNN =   "\u16B9"
const HAGLAZ = "\u16BA"
const HAEGL =  "\u16BB"
const HAGALL = "\u16BC"
const NAUDIZ = "\u16BE"
const ISAZ =   "\u16C1"
const JERAN =  "\u16C3"
const GER =    "\u16C4"
const PEORTH = "\u16C8"
const ALGIZ =  "\u16C9"
const SOWILO = "\u16CA"
const SIGEL =  "\u16CB"
const TYR =    "\u16CF"
const BEORC =  "\u16D2"
const OPEN_P = "\u16D5"
const EHWAZ =  "\u16D6"
const MANNAZ = "\u16D7"
const LAUKAZ = "\u16DA"
const ING =    "\u16DD"
const DAGAZ =  "\u16DE"
const ETHEL =  "\u16DF"
const EAR =    "\u16E0"
const IOR =    "\u16E1"
const CALC =   "\u16E3"
const STAN =   "\u16E5"

const TOLKIEN_K  = "\u16F1" 
const TOLKIEN_SH = "\u16F2"
const TOLKIEN_OO = "\u16F3"

const SOSARIAN_V = `${URUZ}${VS14}`

const SOSARIAN_RUNE_MAP:Map<string,string> = new Map<string,string>([
    ['A',  AESC],
    ['B',  BEORC], 
    ['C',  CEN],
    ['D',  DAGAZ],
    ['E',  EHWAZ],
    ['F',  FEOH],
    ['G',  GEBO],
    ['H',  WYNN],
    ['I',  ISAZ],
    ['J',  GER],
    ['K',  TOLKIEN_K],
    ['L',  LAUKAZ],
    ['M',  MANNAZ],
    ['N',  NAUDIZ],
    ['O',  OS],
    ['P',  OPEN_P],
    ['Q',  KAUN],
    ['R',  RAIDO],
    ['S',  SIGEL],
    ['T',  TYR],
    ['U',  URUZ],
    ['V',  SOSARIAN_V],
    ['W',  HAEGL],
    ['X',  CALC],
    ['Y',  YR],
    ['Z',  ALGIZ],
    ['EE',  ING],
    ['NG',  ETHEL],
    ['ST',  STAN],
    ['TH',  THORN],
    ['EA',  EAR]
]);

const SOSARIAN_WORD_MAP:Map<string,string> = new Map<string,string>([
]);

class RuneTranslator {
    private wordMap: Map<string, string>;
    private runeMap: Map<string, string>;

    constructor(runeMap: Map<string, string>, wordMap: Map<string, string>) {
        this.runeMap = runeMap;
        this.wordMap = wordMap;
    }

    public static sosarian(){
        return new RuneTranslator(SOSARIAN_RUNE_MAP, SOSARIAN_WORD_MAP)
    }

    translate(input: string): string {
        return input;  
    }

    public translateWord(word: string): string {
        let regexp = new RegExp(Array.from(this.runeMap.keys()).map(key=>`${key}`).join("|")+"|\w", 'gi')

        return word.replace(regexp, match=>this.runeMap.get(match.toUpperCase()) ?? match);
    }
}