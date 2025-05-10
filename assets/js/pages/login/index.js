import { handleErrorMessage } from "../../../../utils/dom.js";
import { Endpoints, get } from "../../../../utils/HttpClient.js";
import { getUserId, setUserId } from "../../../../services/auth.js";


export function checkPassword(userPassword, password) {
  return userPassword == password
}

export async function findUserByEmail(email) {
  // const response = await get(Endpoints.USUARIOS, { email: email })
  try {
    const response = await get(Endpoints.USUARIOS, { email: email })
    await setUserId(response[0].id)
    return response
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

export function errorMessage(element, message) {
  handleErrorMessage(element, message)
}
