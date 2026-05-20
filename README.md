# ⚡ Demo Vite

Projeto pequeno e didático para demonstrar as principais funcionalidades do **Vite**, com ênfase no **processo de build**.

## 🚀 O que é o Vite?

Vite (pronuncia-se "vit", do francês "rápido") é uma ferramenta de build moderna criada pelo Evan You (criador do Vue.js). Ele tem dois grandes diferenciais:

- **Em desenvolvimento**: serve os arquivos via **ESM nativo do navegador**, sem precisar empacotar nada. O servidor sobe quase instantaneamente.
- **Em produção**: usa o **Rollup** por baixo dos panos para gerar um bundle altamente otimizado.

## 📂 Estrutura do projeto

```
projeto-vite/
├── index.html          ← Entrada da aplicação (Vite trata como módulo)
├── vite.config.js      ← Configuração do Vite + Vitest
├── package.json        ← Scripts e dependências
├── .env                ← Variáveis de ambiente (prefixo VITE_)
├── public/             ← Arquivos servidos como estão (sem processamento)
│   └── vite.svg
└── src/
    ├── main.js         ← Ponto de entrada do JS
    ├── counter.js      ← Demonstra HMR
    ├── heavy.js        ← Demonstra code splitting (dynamic import)
    ├── utils.js        ← Funções utilitárias (uma é "dead code")
    ├── utils.test.js   ← Testes com Vitest
    └── style.css       ← Estilos (processados e minificados pelo Vite)
```

## 🛠 Como rodar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (com HMR)
npm run dev

# Build de produção → gera ./dist
npm run build

# Servir o build localmente para testar
npm run preview

# Rodar testes
npm test

# Build + visualização gráfica do bundle (gera dist/stats.html)
npm run build:analyze

# Cobertura de testes
npm run test:coverage
```

## 🎯 Funcionalidades demonstradas

### 1. Servidor de desenvolvimento ultrarrápido
O comando `npm run dev` sobe um servidor em menos de 1 segundo. Diferente de bundlers tradicionais (Webpack), o Vite **não empacota a aplicação inteira em dev** — ele envia cada módulo conforme o navegador pede via ESM.

### 2. Hot Module Replacement (HMR)
Edite `src/style.css` ou `src/counter.js` com o servidor rodando — a alteração aparece instantaneamente, **sem perder o estado da página** (o contador continua no mesmo número).

### 3. Build otimizado de produção (Rollup)
`npm run build` gera a pasta `dist/` com:

- **Minificação** de JS e CSS (esbuild, extremamente rápido)
- **Tree-shaking**: a função `funcaoNaoUsada` em `utils.js` não vai pro bundle final
- **Hashing nos nomes** (`main-a3f9b2.js`) → permite cache agressivo no navegador
- **Sourcemaps** para depurar em produção

### 4. Code splitting (dynamic imports)
O módulo `src/heavy.js` é importado dinamicamente via `await import('./heavy.js')`. O Vite gera **um chunk separado** para ele — só baixado quando o usuário clica no botão. Isso reduz o tamanho do bundle inicial.

### 5. Variáveis de ambiente
Apenas variáveis com prefixo `VITE_` são expostas ao código do cliente via `import.meta.env`. As outras (`MODE`, `DEV`, `PROD`, `BASE_URL`) são built-in.

### 6. Processamento de assets
- CSS é minificado e injetado automaticamente
- Imagens, fontes e outros arquivos importados ganham hash e são copiados para `dist/assets`
- A pasta `public/` é servida como está (sem hash)

### 7. Testes integrados com Vitest
O **Vitest** é o test runner oficial do ecossistema Vite. Usa a **mesma configuração** do `vite.config.js`, então não há duplicação. API compatível com Jest.

### 8. Análise visual de bundle
`npm run build:analyze` abre um treemap interativo (`dist/stats.html`) mostrando o tamanho de cada módulo no bundle final — ótimo pra identificar dependências pesadas.

## 📊 O que olhar no build de produção

Após rodar `npm run build`, abra a pasta `dist/`:

```
dist/
├── index.html                       ← HTML com referências às assets
├── assets/
│   ├── main-[hash].js               ← Entry principal
│   ├── heavy-[hash].js              ← Chunk lazy (só baixado on-demand)
│   ├── utils-[hash].js              ← Chunk separado (manualChunks)
│   └── index-[hash].css             ← CSS minificado
└── stats.html                       ← (apenas com build:analyze)
```

## 🔗 Links úteis

- Documentação oficial: https://vite.dev
- Vitest: https://vitest.dev
- Rollup (usado pelo Vite em produção): https://rollupjs.org
