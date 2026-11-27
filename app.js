(async function () {
  const resp = await fetch('schedule.json');
  const dados = await resp.json();
  const agenda = dados.agenda.slice().sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));

  const porDia = {};
  for (const item of agenda) (porDia[item.data] ||= []).push(item);

  const publicados = agenda.filter(i => i.status === 'publicado').length;
  const agendados = agenda.filter(i => i.status === 'agendado').length;
  document.getElementById('resumo').textContent =
    `${publicados} publicados · ${agendados} agendados · pendentes sem imagem: ${dados.pendentes_sem_imagem.join(', ')} · atualizado em ${dados.atualizado}`;

  const main = document.getElementById('calendario');
  for (const dia of Object.keys(porDia)) {
    const secao = document.createElement('section');
    secao.className = 'dia';
    const data = new Date(dia + 'T12:00:00');
    const titulo = data.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    secao.innerHTML = `<h2>${titulo}</h2><div class="grade"></div>`;
    const grade = secao.querySelector('.grade');
    for (const item of porDia[dia]) {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.imagem}" alt="${item.titulo}" loading="lazy">
        <div class="info">
          <div class="hora">${item.hora}</div>
          <div class="titulo">${item.id} · ${item.titulo}</div>
          <span class="badge ${item.status}">${item.status}</span>
        </div>`;
      grade.appendChild(card);
    }
    main.appendChild(secao);
  }
})();
