import {RuneTranslator, Token} from '../src'

test('Empty string', ()=> {
    let translator = RuneTranslator.sosarian();

    let result:Token[] = translator.splitWords("");

    expect(result).toEqual([]);
}) 