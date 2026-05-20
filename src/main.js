// Ponto de entrada da aplicação
import './style.css';
import { setupCounter } from './counter.js';
import { formatEnvInfo } from './utils.js';

// Monta o contador (demonstra HMR — edite e salve para ver)
setupCounter(document.querySelector('#counter-area'));

// Mostra variáveis de ambiente expostas pelo Vite
// Apenas variáveis com prefixo VITE_ são incluídas no bundle do cliente
document.querySelector('#env-output').textContent = formatEnvInfo({
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
  VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
});

// Dynamic import → o Vite gera um chunk separado para esse módulo
// Esse chunk só é baixado quando o botão é clicado (code splitting)
document.querySelector('#lazy-btn').addEventListener('click', async () => {
  const { runHeavyTask } = await import('./heavy.js');
  const result = runHeavyTask();
  document.querySelector('#lazy-output').textContent = result;
});

// API de HMR do Vite — aceita atualizações sem recarregar a página
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('[HMR] módulo atualizado');
  });
}
