class Methods {

  async findHospitalById(id) {

  }
  async findHospitalByName(name) {

  }
  async registerHospital() {

  }
  async listAll() {
    const response = await fetch(`http://localhost:3000/hospitais`);
    const data = await response.json();

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