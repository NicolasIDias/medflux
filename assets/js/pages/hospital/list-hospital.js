import { listAll } from "./index.js";

document.addEventListener('DOMContentLoaded', async () => {
  const response = await listAll();
  const container = document.querySelector('.cards-hospitais');

  if (response.statusCode === 200 && response.data.length > 0) {
    response.data.forEach(hospital => {
      const card = renderCards(hospital);
      container.appendChild(card);
    });
  } else {
    container.innerHTML = `<p class="text-muted">Nenhum hospital encontrado.</p>`;
  }
});



function renderCards(hospital) {
  const col = document.createElement('div');
  col.className = 'col-sm-4 mb-3';

  col.innerHTML = `
    <div class="card">
      <div class="hospital-card p-2">
        <div class="content">
          <h5 class="nome-hospital">${hospital.nome}</h5>
          <p><strong>Convênios:</strong> ${hospital.convenios?.join(', ') || 'Não informado'}</p>
          <p><strong>Endereço:</strong> ${hospital.endereco || 'Não informado'}</p>
          <p><strong>Tipos de atendimentos:</strong> ${hospital.especialidades?.join(', ') || 'Não informado'}</p>
        </div>
        <div class="buttons">
          <a href="./filas-presenciais.html" class="btn btn-outline-primary btn-action mb-1">
            <i class="fas fa-users"></i> Ver filas presenciais
          </a>
          <a href="./filas-online.html" class="btn btn-outline-secondary btn-action">
            <i class="fas fa-laptop-medical"></i> Ver Atendimentos Online
          </a>
        </div>
      </div>
    </div>
  `;

  return col;
}
