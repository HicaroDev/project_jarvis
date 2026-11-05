function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

document.getElementById("lastUpdated").textContent =
  "Atualizado em " + fmtDate(JARVIS_DATA.lastUpdated);

document.getElementById("statusFase").textContent = JARVIS_DATA.status.fase;
document.getElementById("statusResumo").textContent = JARVIS_DATA.status.resumo;

const roadmapEl = document.getElementById("roadmap");
JARVIS_DATA.roadmap.forEach((r) => {
  const li = document.createElement("li");
  li.className = r.status;
  li.innerHTML = `<span class="titulo">${r.fase} — ${r.titulo}</span>
    <span class="tag ${r.status}">${r.status.replace("-", " ")}</span>
    <span class="detalhe">${r.detalhe}</span>`;
  roadmapEl.appendChild(li);
});

const compEl = document.getElementById("componentes");
JARVIS_DATA.componentes.forEach((c) => {
  const div = document.createElement("div");
  div.className = "componente";
  div.innerHTML = `<div class="nome">${c.nome}</div>
    <div class="papel">${c.papel}</div>
    <span class="pode">${c.pode}</span>
    <span class="nao-pode">${c.naoPode}</span>`;
  compEl.appendChild(div);
});
document.getElementById("regraCentral").textContent = JARVIS_DATA.regraCentral;

const decisoesEl = document.getElementById("decisoes");
[...JARVIS_DATA.decisoes].reverse().forEach((d) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${d.data}</td><td>${d.quem}</td><td>${d.decisao}</td>`;
  decisoesEl.appendChild(tr);
});

const histEl = document.getElementById("historico");
[...JARVIS_DATA.historico].reverse().forEach((h) => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<time>${h.data} ${h.hora}</time>${h.evento}`;
  histEl.appendChild(div);
});

const skillsEl = document.getElementById("skills");
JARVIS_DATA.skills.forEach((s) => {
  const span = document.createElement("span");
  span.textContent = s;
  skillsEl.appendChild(span);
});

document.getElementById("docLink").href = JARVIS_DATA.linkDocArquitetura;
