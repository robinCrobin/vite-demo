export function increment(value) {
  return value + 1;
}

export function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

export function formatEnvInfo(envObject) {
  return Object.entries(envObject)
    .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
    .join('\n');
}

// Esta função NÃO é importada em nenhum lugar — o tree-shaking
// do Vite/Rollup vai removê-la do bundle de produção.
export function funcaoNaoUsada() {
  return 'esse código nunca chega no build final';
}
