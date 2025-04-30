import { Endpoints, get } from "../../core/http.js";

class Methods {

  async findHospitalById(id) {
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
  async findHospitalByName(name) {

  }
  async registerHospital() {

  }
  async listAll() {
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

  

}


export const methods = new Methods()