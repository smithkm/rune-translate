import {RuneTranslator} from '../src'

test('Empty string', ()=> {
    let translator = RuneTranslator.sosarian();

    let result = translator.translate("");

    expect(result).toBe('');
}) 