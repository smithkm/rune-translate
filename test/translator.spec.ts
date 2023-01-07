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