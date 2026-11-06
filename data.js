// PROJECT_JARVIS — dados do painel de acompanhamento.
// Append-only nas listas de histórico/decisões (nunca reescrever o passado,
// só corrigir com uma entrada nova explicando a correção).
// Atualizado pelo Claude Code a cada marco relevante de trabalho.

const JARVIS_DATA = {
  lastUpdated: "2026-11-06T10:35:00-03:00",

  status: {
    fase: "Primeira PoC real concluída — adaptador OpenCode validado de ponta a ponta",
    resumo: "Usuário autorizou e a PoC real rodou com sucesso: GLM-5.3-Flash Free criou e leu um arquivo de teste no sandbox dedicado. Exit code 0, 18.07s, custo real = 0 (confirmado pelo próprio OpenCode), só as ferramentas write/read foram usadas, nenhum sinal de login/pagamento/permissão disparou o abort-watch implementado sob exigência do usuário. VPS e Obsidian intocados. Limitação de isolamento de sistema (sem restricted token) ficou registrada como risco conhecido e requisito obrigatório antes de qualquer operação autônoma sobre projetos reais — não é uma pendência resolvida, é uma condição explícita pra próxima etapa.",
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
    { fase: "Fase Investigação", titulo: "Claude Code como executor especializado", status: "em-andamento", detalhe: "Configuração final da PoC definida (--bare, --max-budget-usd, blockWritesOutsideWorkingDirectories) e aprovada em conceito — aguardando o usuário gerar a API key própria e confirmar o gasto real. Adaptador preservado intacto durante a trilha OpenCode." },
    { fase: "Fase OpenCode", titulo: "PoC gratuita via OpenCode (alternativa de menor custo)", status: "concluido", detalhe: "1a execução real concluída com sucesso (GLM-5.3-Flash Free): exit_code 0, 18.07s, custo real 0, só write/read usadas, abort-watch não disparou. Limitação de isolamento de sistema (sem restricted token) registrada como risco conhecido e requisito obrigatório antes de operações autônomas sobre projetos reais — decisão explícita do usuário, não renegociável sem nova autorização." },
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
    { data: "2026-11-05", quem: "Hícaro", decisao: "Exigida verificação oficial (não por memória) de 4 cenários de autenticação do Claude Code antes de qualquer gasto; vetado o uso de claude setup-token pro Worker — distinção entre uso pessoal da assinatura e integração em aplicação própria, que exige API key própria." },
    { data: "2026-11-06", quem: "Hícaro", decisao: "Aprovada 1 execução real de PoC do Claude Code sob 8 condições (Haiku 5.5, API key exclusiva, limite de gasto no Console, --max-budget-usd, sandbox code-enforced, aprovação humana, tarefa única, registro de custo real) — orçamento máximo de US$1,00; API key a ser gerada pelo usuário; execução real aguardando confirmação final dele." },
    { data: "2026-11-06", quem: "Hícaro", decisao: "Aprovada PoC alternativa e gratuita via OpenCode (já instalado), preservando o adaptador Claude Code intacto; exigidos testes de segurança (permissão, isolamento de diretório, allowlist de ferramentas) antes de qualquer execução real, mesmo gratuita; rejeitado diretório isolado sozinho como barreira suficiente." },
    { data: "2026-11-06", quem: "Hícaro", decisao: "Aceita a opção A de isolamento (barreiras de aplicação, sem restricted token) só para a PoC trivial atual; limitação registrada como risco conhecido e requisito obrigatório antes de qualquer operação autônoma sobre projetos reais; exigido abort-watch em tempo real (interromper diante de login/pagamento/permissão/troca de provedor) antes da autorização final." },
    { data: "2026-11-06", quem: "Hícaro", decisao: "Autorizada explicitamente a execução real da tarefa d3a8714d-9b36-483c-bbf2-50e00668201f com opencode/glm-5.3-flash-free — autorização restrita a essa tarefa única, não estendida a outras tarefas, instalações ou infraestrutura." },
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
    { hora: "06:20", data: "2026-11-06", evento: "run_claude_code_task implementado e testado (9 testes): pending_approval, allowlist de tools, tetos de max_turns/timeout, kill de árvore via psutil, recuperação segura de marker órfão — tudo contra mock, zero chamada real." },
    { hora: "06:30", data: "2026-11-06", evento: "Verificação oficial (não por memória) dos 4 cenários de auth do Claude Code: --bare nunca lê credencial OAuth, --max-budget-usd pode ser ultrapassado ('spend can pass the cap'), blockWritesOutsideWorkingDirectories é enforcement de código válido desde v2.1.314 (instalada: 2.1.318)." },
    { hora: "06:35", data: "2026-11-06", evento: "Configuração final da PoC do Claude Code documentada (--bare -p --model claude-haiku-5-5 --allowedTools Write --max-turns 3 --max-budget-usd 0.20) — apresentada ao usuário, aguardando API key própria e confirmação final." },
    { hora: "08:11", data: "2026-11-06", evento: "Usuário aprovou PoC alternativa gratuita via OpenCode, com testes de segurança obrigatórios antes de qualquer execução real." },
    { hora: "08:30", data: "2026-11-06", evento: "run_opencode_task implementado reaproveitando fila/aprovação/timeout/kill de processos existentes; 11 testes passando, incluindo validação offline real da sintaxe de permissão (opencode debug config, v1.18.31) e teste que confirma ausência de isolamento de sistema operacional sem restricted token." },
    { hora: "09:30", data: "2026-11-06", evento: "Abort-watch em tempo real implementado: thread lê stdout/stderr linha a linha e mata a árvore de processos no instante em que detecta sinal de login/autenticação/pagamento/permissão/troca de provedor, em vez de só verificar depois do processo terminar." },
    { hora: "10:30", data: "2026-11-06", evento: "Primeira execução real do adaptador: GLM-5.3-Flash Free criou e leu poc-opencode.txt no sandbox dedicado. exit_code 0, 18.07s, custo real 0, só write/read usadas, abort-watch não disparou, VPS/Obsidian intocados. Divergência mínima no conteúdo (ponto final extra) registrada com honestidade." },
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
