import {RuneTranslator} from '../src'

test('Empty string', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("");

    expect(result).toBe('');
})

test('One word', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("sosaria");

    expect(result).toBe('ᛋᚩᛋᚫᚱᛁᚫ');
})

test('Two words', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("sosaria runes");

    expect(result).toBe('ᛋᚩᛋᚫᚱᛁᚫ᛫ᚱᚢᚾᛖᛋ');
})

test('Two sentances', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("Sosaria runes. Another sentance.");

    expect(result).toBe('ᛋᚩᛋᚫᚱᛁᚫ᛫ᚱᚢᚾᛖᛋ᛫᛫ᚫᚾᚩᚦᛖᚱ᛫ᛋᛖᚾᛏᚫᚾᚳᛖ');
})

test("With irregular words", ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("The rearrangement's mistranslated asthma in Moonglow.");

    expect(result).toBe('ᚦᛖ᛫ᚱᛖᚫᚱᚱᚫᚾᚷᛖᛗᛖᚾᛏᛋ᛫ᛗᛁᛋᛏᚱᚫᚾᛋᛚᚫᛏᛖᛞ᛫ᚫᛋᚦᛗᚫ᛫ᛁᚾ᛫ᛗᚩᚩᚾᚷᛚᚩᚻ');
})

test("Pangram", ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("The quick brown fox jumps over the lazy dog eating his beef steaks.");

    expect(result).toBe('ᚦᛖ᛫ᚴᚢᛁᚳᛱ᛫ᛒᚱᚩᚻᚾ᛫ᚠᚩᛣ᛫ᛄᚢᛗᛕᛋ᛫ᚩᚢ︍ᛖᚱ᛫ᚦᛖ᛫ᛚᚫᛉᚣ᛫ᛞᚩᚷ᛫ᛠᛏᛁᛟ᛫ᚹᛁᛋ᛫ᛒᛝᚠ᛫ᛥᛠᛱᛋ');
})

test("Novian Pangram", ()=> {
    let translator = RuneTranslator.novian();

    let result = translator.translate("The quick brown fox jumps over the lazy dog eating his beef steaks.");

    expect(result).toBe('ᛏᚻᛖ᛫ᚴᚢᛁᚳᚲ᛫ᛒᚱᚩᚹᚾ᛫ᚠᚩᛣ᛫ᛡᚢᛗᛈᛊ᛫ᚩᚢ︍ᛖᚱ᛫ᛏᚻᛖ᛫ᛚᚫᛉᚣ᛫ᛞᚩᚷ᛫ᛖᚫᛏᛁᚾᚷ᛫ᚻᛁᛊ᛫ᛒᛖᛖᚠ᛫ᛊᛏᛖᚫᚲᛊ');
})

test("Ophidian Pangram", ()=> {
    let translator = RuneTranslator.ophidian();

    let result = translator.translate("The quick brown fox jumps over the lazy dog.");

    expect(result).toBe('        ');
})

test("Ophidian Punctuation", ()=> {
    let translator = RuneTranslator.ophidian();

    let result = translator.translate("Blah, blah, blah. Test-test.");

    expect(result).toBe('   -');
})
