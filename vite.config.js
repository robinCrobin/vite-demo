import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

// Configuração do Vite — documentação: https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Caminho base — útil para deploy em subdiretório (ex: GitHub Pages)
  base: './',

  // Servidor de desenvolvimento com HMR (Hot Module Replacement)
  server: {
    port: 5173,
    open: true, // abre o navegador automaticamente
  },

  // Configurações de build (Vite usa Rollup por baixo dos panos)
  build: {
    // Diretório de saída do build de produção
    outDir: 'dist',

    // Gera sourcemaps para depuração em produção
    sourcemap: true,

    // Minificador: 'esbuild' (padrão, rápido) ou 'terser' (mais agressivo)
    minify: 'esbuild',

    // Alvo de compatibilidade dos navegadores
    target: 'es2020',

    // Avisa quando algum chunk fica grande demais
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Code splitting manual: separa libs em chunks diferentes
        manualChunks: {
          utils: ['./src/utils.js'],
        },
        // Nomes de arquivo com hash para cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  // Plugins
  plugins: [
    // Gera um relatório visual do bundle quando rodando em modo analyze
    mode === 'analyze' &&
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  // Configuração do Vitest (testes integrados ao Vite)
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
}));
