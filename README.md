# Project_Jarvis — Painel de Acompanhamento

Site estático (HTML/CSS/JS puro, zero build) pra acompanhar visualmente o
progresso do ecossistema Jarvis — sem precisar rolar o histórico de chat.

## Como atualizar

Todo o conteúdo vive em `data.js`. Edite os arrays lá (roadmap, decisoes,
historico, componentes, skills) — `index.html` e `app.js` só renderizam.

**Convenção: append-only.** `decisoes` e `historico` nunca têm entradas
reescritas ou apagadas — uma correção vira uma entrada nova explicando a
correção, igual ao Log de Atividades do Segundo Cérebro.

## Deploy

Zero configuração — qualquer provedor de site estático serve (Vercel,
GitHub Pages, Netlify). Sem dependências, sem passo de build.

## Fonte de verdade mais detalhada

Este painel é um resumo visual. O documento completo de arquitetura (seções
A-P: diagnóstico, arquitetura, matriz de riscos, backlog, auditoria técnica)
fica em `data.js` → `linkDocArquitetura`.
