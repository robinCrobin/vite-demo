import { describe, it, expect } from 'vitest';
import { increment, sum, formatEnvInfo } from './utils.js';

describe('increment', () => {
  it('soma 1 ao valor passado', () => {
    expect(increment(0)).toBe(1);
    expect(increment(41)).toBe(42);
  });
});

describe('sum', () => {
  it('soma todos os números de um array', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  it('retorna 0 para array vazio', () => {
    expect(sum([])).toBe(0);
  });
});

describe('formatEnvInfo', () => {
  it('formata um objeto em linhas "chave = valor"', () => {
    const result = formatEnvInfo({ MODE: 'test', DEV: true });
    expect(result).toContain('MODE = "test"');
    expect(result).toContain('DEV = true');
  });
});
