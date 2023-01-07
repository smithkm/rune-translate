import {RuneTranslator, Token} from '../src'

test('Empty string', ()=> {
    let translator = RuneTranslator.sosarian();

    let result:Token[] = translator.splitWords("");

    expect(result).toStrictEqual([]);
}) 

test('One word', ()=> {
    let translator = RuneTranslator.sosarian();

    let result:Token[] = translator.splitWords("blah");

    expect(result).toStrictEqual([{type:"word", value:"blah"}]);
}) 