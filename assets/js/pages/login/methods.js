// methods.js
class Methods {
  async checkPassword(userPassword, password) {
    return userPassword == password
  }

  async findUserByEmail(email, context) {
    try {
      const response = await fetch(`http://localhost:3000/${context}?email=${email}`);
      if (!response.ok) throw new Error("Erro na requisição");
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  }

  handleErrorMessage(element, message) {
    let error = element.nextElementSibling;

    if (!error?.classList.contains("message-error")) {
      error = document.createElement("p");
      error.className = "message-error";
      element.insertAdjacentElement("afterend", error);
    }

    error.style.display = "block";
    error.style.color = "red";
    error.textContent = message;
  }
}

export const methods = new Methods();