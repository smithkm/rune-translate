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

test('Two words', ()=> {
    let translator = RuneTranslator.sosarian();

    let result:Token[] = translator.splitWords("two words");

    expect(result).toStrictEqual([
        {type: "word", value: "two"},
        {type: "space", value: " "},
        {type: "word", value: "words"}]);
}) 

test('Two words with punctuation', ()=> {
    let translator = RuneTranslator.sosarian();

    let result:Token[] = translator.splitWords("two. words");

    expect(result).toStrictEqual([
        {type: "word", value: "two"},
        {type: "punctuation", value: ". "},
        {type: "word", value: "words"}]);
})

test('Hyphenated word', ()=> {
    let translator = RuneTranslator.sosarian();

    let result:Token[] = translator.splitWords("hyphenated-word");

    expect(result).toStrictEqual([
        {type: "word", value: "hyphenated-word"}]);
})