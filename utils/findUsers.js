import { Endpoints, get } from "./HttpClient.js";

async function findUserByEmail(email) {
  try {
    const response = await get(Endpoints.USUARIOS, { email: email })
    return response
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

async function findUserById(id) {
  try {
    const response = await get(Endpoints.USUARIOS, { id: id })
    return response
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

async function findDoctorByEmail(email) {
  try {
    const response = await get(Endpoints.MEDICOS, { email: email })
    return response
  } catch (error) {
    console.error("Erro ao buscar Medico:", error);
    return null;
  }
}

async function findDoctorById(id) {
  try {
    const response = await get(Endpoints.MEDICOS, { id: id })
    return response
  } catch (error) {
    console.error("Erro ao buscar Medico:", error);
    return null;
  }
}