// PROJECT_JARVIS — dados do painel de acompanhamento.
// Append-only nas listas de histórico/decisões (nunca reescrever o passado,
// só corrigir com uma entrada nova explicando a correção).
// Atualizado pelo Claude Code a cada marco relevante de trabalho.

const JARVIS_DATA = {
  lastUpdated: "2026-11-05T20:40:00-03:00",

  status: {
    fase: "Realinhamento — Ollama só no HP + investigação do Claude Code como executor",
    resumo: "Usuário confirmou: Ollama exclusivamente no HP (RTX 5070), teste no Acer suspenso sem apagar nada. Nova prioridade: avaliar se o Jarvis Worker já construído serve de adaptador entre o Hermes e a execução real do Claude Code — proposta técnica (fluxo + PoC + critérios de aceite) escrita, aguardando aprovação antes de qualquer código novo.",
  },

  componentes: [
    { nome: "Hermes VPS", papel: "Orquestração/coordenação — Hermes Agent oficial (Nous Research), restrito", pode: "Classificar mensagens, criar tarefas, solicitar execuções", naoPode: "Executar comandos arbitrários nos notebooks" },
    { nome: "Jarvis Boost (HP · RTX 5070)", papel: "Processamento de IA pesado, ainda não conectado", pode: "Processar IA, consultar ferramentas autorizadas, propor alterações", naoPode: "Alterar projetos críticos sem aprovação" },
    { nome: "Jarvis Worker (Acer · GTX 1650)", papel: "Executor local — construído e testado", pode: "Executar tarefas aprovadas em diretórios isolados (allowlist fixa)", naoPode: "Acessar todo o sistema ou modificar o cofre original" },
    { nome: "Memory Engine", papel: "Independente do Hermes, preserva o Obsidian como fonte documental", pode: "Registrar eventos, indexar e disponibilizar conhecimento autorizado", naoPode: "Sobrescrever documentos originais automaticamente" },
  ],

  regraCentral: "Hermes pode propor e delegar; o executor local decide se a tarefa está autorizada conforme uma política independente. Nenhum comando recebido da VPS ganha privilégio automaticamente.",

  roadmap: [
    { fase: "Fase 0a", titulo: "Jarvis Worker local (sem LLM)", status: "concluido", detalhe: "Fila SQLite + executor allowlist + painel + leitura read-only do Segundo Cérebro. 3 testes passando." },
    { fase: "Fase 0b", titulo: "LLM local via Ollama", status: "pendente", detalhe: "Suspenso no Acer (2026-11-05) — redirecionado exclusivamente para o HP RTX 5070, autorização separada. Instalador e scripts de teste preservados, nada apagado." },
    { fase: "Fase Investigação", titulo: "Claude Code como executor especializado", status: "em-andamento", detalhe: "Avaliando se o Jarvis Worker (fila+executor+allowlist já construídos) serve de adaptador entre o Hermes e o `claude -p`. Proposta técnica (fluxo, custo, isolamento, aprovação humana, PoC, critérios de aceite) escrita — aguardando aprovação do usuário antes de código novo." },
    { fase: "Fase 0c", titulo: "Auditoria do Hermes Agent oficial", status: "concluido", detalhe: "Confirmado: provider custom = Ollama local grátis; ollama-cloud/nous = pago; WireGuard já existe na VPS (outro peer); write-guard de perfil é só convenção, não fronteira de segurança." },
    { fase: "Fase 1", titulo: "Proposta de isolamento do Hermes na VPS", status: "pendente", detalhe: "Usuário sem privilégio admin, diretórios restritos, segredos separados — só proposta, sem executar na VPS compartilhada." },
    { fase: "Fase 2", titulo: "Conectar HP via WireGuard", status: "pendente", detalhe: "Segunda etapa, só depois do teste local isolado validar o caminho." },
    { fase: "Fase 3", titulo: "Painel + guard-rails + aprovações", status: "pendente", detalhe: "Fila de aprovação visível, guard-rails fixos antes de qualquer ação sensível real." },
  ],

  decisoes: [
    { data: "2026-11-02", quem: "Hícaro + Claude", decisao: "Diagnóstico de hardware do Acer (GTX 1650 4GB, Ryzen 7 3750H, 14GB RAM) — base pra escolha de modelo local." },
    { data: "2026-11-03", quem: "Claude", decisao: "Triagem das 9 ferramentas de IA local do guia recebido — Jeff, Indra OCR, EmbeddingGemma com bom fit; resto fora de escopo ou pendente." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Briefing completo do Projeto Jarvis (arquitetura multiagente: HP, Acer, VPS, Segundo Cérebro) — ponto de partida da arquitetura." },
    { data: "2026-11-05", quem: "Claude", decisao: "Diagnóstico real do Hermes_agents/VPS/Obsidian antes de propor arquitetura — nada hipotético apresentado como implementado." },
    { data: "2026-11-05", quem: "ChatGPT + Hícaro", decisao: "Revisão crítica aceita: tratar o gateway como não auditado, MVP sem depender de Ollama, Obsidian não migra pro HP sem decisão explícita." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Autorizada a primeira entrega local (Jarvis Worker: fila, executor, painel, leitura do Segundo Cérebro) — só no Acer, sem VPS." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Autorizada auditoria SSH read-only na VPS — revelou que o Hermes é o Hermes Agent oficial da Nous Research (commit de Teknium), não um framework próprio." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Aprovada arquitetura híbrida (opção C): Hermes como orquestração/mensageria, Jarvis Boost/Worker próprios pra dado pessoal e execução." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Aprovado teste local isolado (Ollama + provider custom), com a condição de apresentar plano/impacto antes de instalar — depois ampliada pra autonomia total do Claude na execução." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Criado o repositório project_jarvis (GitHub/Vercel) pra acompanhamento visual do progresso — este painel." },
    { data: "2026-11-05", quem: "Hícaro", decisao: "Confirmado realinhamento arquitetural: Ollama exclusivamente no HP (teste no Acer suspenso, nada apagado); Hermes é só coordenador (registra/delega), nunca executor irrestrito; nova prioridade é investigar o Jarvis Worker como adaptador entre o Hermes e o Claude Code, evitando criar agente redundante." },
  ],

  historico: [
    { hora: "07:51", data: "2026-11-02", evento: "Diagnóstico de hardware concluído." },
    { hora: "07:51", data: "2026-11-03", evento: "Recebido guia-fontes-ia-e-execucao-local.md via Telegram; 9 ferramentas triadas." },
    { hora: "14:18", data: "2026-11-05", evento: "Diagnóstico completo do ecossistema Jarvis entregue (seções A-G do doc de arquitetura)." },
    { hora: "14:25", data: "2026-11-05", evento: "Documento estendido com Trilha B: telas, backlog, matriz de riscos (seções H-L)." },
    { hora: "14:27", data: "2026-11-05", evento: "Jarvis Worker construído em C:\\DEV\\LLM_LOCAL\\jarvis-worker\\ — fila, executor, painel, leitor Obsidian." },
    { hora: "14:27", data: "2026-11-05", evento: "3 testes da fila passando: claim atômico, recuperação sem duplicação, allowlist bloqueando ação desconhecida." },
    { hora: "14:35", data: "2026-11-05", evento: "Auditoria SSH read-only: confirmado Hermes Agent oficial (Nous Research/Teknium), 40 providers, 22 plataformas, 65 MCPs." },
    { hora: "14:48", data: "2026-11-05", evento: "Auditoria técnica aprofundada: custom=Ollama local grátis; ollama-cloud/nous=pago; WireGuard existe mas não liga o Acer; write-guard não é fronteira de segurança." },
    { hora: "15:05", data: "2026-11-05", evento: "Criado project_jarvis no GitHub — este painel de acompanhamento." },
    { hora: "20:10", data: "2026-11-05", evento: "Usuário confirmou realinhamento: Ollama só no HP, teste no Acer suspenso (nada apagado), Hermes como coordenador não executor." },
    { hora: "20:40", data: "2026-11-05", evento: "Avaliação de código concluída: Jarvis Worker é extensível como adaptador do Claude Code (allowlist + fila já genéricas). Proposta técnica (7 pontos + PoC + critérios de aceite) escrita em proposta-claude-code-adapter.md e seção R do doc de arquitetura." },
  ],

  skills: [
    "Python 3.13 (fila/executor/servidor stdlib)",
    "SQLite (fila persistente)",
    "Ollama (LLM local, em instalação)",
    "Hermes Agent (Nous Research) — provider custom",
    "Claude Code + Claude Docs (documentação viva da arquitetura)",
    "Telegram (canal de acompanhamento em tempo real)",
  ],

  linkDocArquitetura: "https://claude.ai/artifact/8JLfhggWypGNzXHTNxjPNB",
};
