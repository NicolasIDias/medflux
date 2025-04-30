import { Endpoints, get } from "./http.js";
export const PASSWORD_MIN_LEN = 8

export async function isEmailAvailable(email, context){
  const response = await get(`${Endpoints[context]}?email=${encodeURIComponent(email)}`);
  return response.length == 0
}

export function validatePassword(password) {
  if (password.length < PASSWORD_MIN_LEN) {
    return {
      valid: false,
      message: `A senha deve ter no mínimo ${PASSWORD_MIN_LEN} caracteres`
    };
  }
  return { valid: true };
}

export function formatDate(date, isoFormat = true){
  const dateObj = new Date(date)
  return isoFormat ? dateObj.toISOString() : dateObj.toLocaleDateString('pt-BR') 

}