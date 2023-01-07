import {RuneTranslator} from '../src'

test('Empty string', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("");

    expect(result).toBe('');
}) 

test('One rune word', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("a");

    expect(result).toBe('\u16AB');
}) 

test('Two rune word', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("ab");

    expect(result).toBe('\u16AB\u16D2');
}) 

test('Word with unknown character', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("2");

    expect(result).toBe('2');
})

test('Word with digraph rune', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("ea");

    expect(result).toBe('\u16E0');
}) 

test('Case insensitive', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("eAbEEF");

    expect(result).toBe('\u16E0\u16D2\u16DD\u16A0');
}) 

test('Digraph overlap', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("eee");

    expect(result).toBe('\u16DD\u16D6');
})

test('Adjacent digraphs', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translateWord("eeee");

    expect(result).toBe('\u16DD\u16DD');
})