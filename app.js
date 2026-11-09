function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function render(data) {
  document.getElementById("lastUpdated").textContent =
    "Atualizado em " + fmtDate(data.lastUpdated);

  document.getElementById("statusFase").textContent = data.status.fase;
  document.getElementById("statusResumo").textContent = data.status.resumo;

  const roadmapEl = document.getElementById("roadmap");
  clear(roadmapEl);
  data.roadmap.forEach((r) => {
    const li = document.createElement("li");
    li.className = r.status;
    li.innerHTML = `<span class="titulo">${r.fase} — ${r.titulo}</span>
      <span class="tag ${r.status}">${r.status.replace("-", " ")}</span>
      <span class="detalhe">${r.detalhe}</span>`;
    roadmapEl.appendChild(li);
  });

  const compEl = document.getElementById("componentes");
  clear(compEl);
  data.componentes.forEach((c) => {
    const div = document.createElement("div");
    div.className = "componente";
    div.innerHTML = `<div class="nome">${c.nome}</div>
      <div class="papel">${c.papel}</div>
      <span class="pode">${c.pode}</span>
      <span class="nao-pode">${c.naoPode}</span>`;
    compEl.appendChild(div);
  });
  document.getElementById("regraCentral").textContent = data.regraCentral;

  const decisoesEl = document.getElementById("decisoes");
  clear(decisoesEl);
  [...data.decisoes].reverse().forEach((d) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${d.data}</td><td>${d.quem}</td><td>${d.decisao}</td>`;
    decisoesEl.appendChild(tr);
  });

  const histEl = document.getElementById("historico");
  clear(histEl);
  [...data.historico].reverse().forEach((h) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<time>${h.data} ${h.hora}</time>${h.evento}`;
    histEl.appendChild(div);
  });

  const pendEl = document.getElementById("pendencias");
  if (pendEl) {
    clear(pendEl);
    (data.pendencias || []).forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="item-texto">${p.item}</span><span class="desde">desde ${p.desde}</span>`;
      pendEl.appendChild(li);
    });
  }

  const skillsEl = document.getElementById("skills");
  clear(skillsEl);
  data.skills.forEach((s) => {
    const span = document.createElement("span");
    span.textContent = s;
    skillsEl.appendChild(span);
  });

  document.getElementById("docLink").href = data.linkDocArquitetura;
}

render(JARVIS_DATA);

// Auto-atualização: refaz o fetch de data.js periodicamente e re-renderiza
// se o conteúdo mudou, sem precisar recarregar a página. Site continua
// estático (sem backend) — só muda a experiência de quem está olhando.
const POLL_MS = 30000;
let lastRaw = null;

async function pollForUpdates() {
  try {
    const res = await fetch("data.js?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return;
    const text = await res.text();
    if (text === lastRaw) return;
    lastRaw = text;
    const data = new Function(text + "\nreturn JARVIS_DATA;")();
    render(data);
  } catch (e) {
    // Falha de rede/parsing não deve quebrar a tela — só tenta de novo no próximo ciclo.
    console.warn("Falha ao verificar atualização do painel:", e);
  }
}

setInterval(pollForUpdates, POLL_MS);
