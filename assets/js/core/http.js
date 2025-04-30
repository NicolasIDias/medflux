const API_BASE = 'http://localhost:3000'
export const Endpoints = {
  USUARIOS: `${API_BASE}/usuarios`,
  FILAS: `${API_BASE}/filas`,
  HOSPITAIS: `${API_BASE}/hospitais`,
  RELATORIOS: `${API_BASE}/relatorios`,
  MEDICOS: `${API_BASE}/medicos`
}

export async function get(resource, queryParams = {}){
  
}