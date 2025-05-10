import { Endpoints, get } from "../../../../utils/HttpClient.js";


export async function findHospitalById(id) {
  const data = await get(Endpoints.HOSPITAIS, { id: id })
  if (data.length == 0) {
    return {
      statusCode: 200,
      message: "Nenhum hospital encontrado",
      data: []
    };
  }

  return {
    statusCode: 200,
    data
  };
}
export async function findHospitalByName(name) {
  const data = await get(Endpoints.HOSPITAIS, { none: name })
  if (data.length == 0) {
    return {
      statusCode: 200,
      message: `Nenhum hospital encontrado com o nome: ${name}`,
      data: []
    };
  }
  return {
    statusCode: 200,
    data
  }
}
// AINDA VOU FAZER
// export async function registerHospital() {

// }
export async function listAll() {
  const data = await get(Endpoints.HOSPITAIS)

  if (data.length == 0) {
    return {
      statusCode: 200,
      message: "Nenhum hospital encontrado",
      data: []
    };
  }

  return {
    statusCode: 200,
    data
  };
}

