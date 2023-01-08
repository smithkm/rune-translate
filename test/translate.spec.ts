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
