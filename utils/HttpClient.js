const API_BASE = 'http://localhost:3000'
export const Endpoints = {
  USUARIOS: `${API_BASE}/usuarios`,
  FILAS: `${API_BASE}/filas`,
  HOSPITAIS: `${API_BASE}/hospitais`,
  RELATORIOS: `${API_BASE}/relatorios`,
  MEDICOS: `${API_BASE}/medicos`
}

export async function get(resource, queryParams = {}) {
  const url = new URL(resource)
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error(`Erro ${response.status}`)
  return response.json()
}

export async function post(resource, data) {
  const url = new URL(resource)
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error(`Erro ${response.status}`);

  return response.json();
}

export async function remove(resource, id) {
  const url = new URL(`${resource}/${id}`)
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error(`Erro ${response.status}`)
  return response.json()
}

export async function update(resource, id, upData) {
  const url = new URL(`${resource}/${id}`)
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(upData)
  })
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
}