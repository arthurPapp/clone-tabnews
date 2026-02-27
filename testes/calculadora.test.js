const calculadora = require("../models/calculadora.js")

test('somar 2 + 2 deveria retornar 4', () => {
    const resultado = calculadora.somar(2, 2);
    expect(resultado).toBe(4)
})

test('somar 5 + 100 deveria retornar ', () => {
    const resultado = calculadora.somar(5, 100);
    expect(resultado).toBe(105)
})

test('somar banana  + 100 deveria retornar erro ', () => {
    const resultado = calculadora.somar('banana', 100);
    expect(resultado).toBe('ERROR')
})


test('somar " "  + " " deveria retornar erro ', () => {
    const resultado = calculadora.somar("", 100);
    expect(resultado).toBe('ERROR')
})


test('somar 1.5  + 15 deveria retornar 2', () => {
    const resultado = calculadora.somar(1.5, 15);
    expect(resultado).toBe(16.5)
})