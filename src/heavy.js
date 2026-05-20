// Módulo carregado sob demanda (dynamic import em main.js)
// Vire um chunk separado no build de produção.
import { sum } from './utils.js';

export function runHeavyTask() {
  const numbers = Array.from({ length: 1000 }, (_, i) => i + 1);
  const total = sum(numbers);
  return `Soma de 1 a 1000 = ${total}\n(módulo carregado como chunk separado)`;
}
