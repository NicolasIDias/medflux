import { methods } from "./methods.js";

const loginForm = document.querySelector("#login-form")
const loginEmailInput = loginForm.querySelector("#loginEmail")
const passwordLoginInput = loginForm.querySelector("#loginSenha")

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));

  const users = await methods.findUserByEmail(data.loginEmail, "usuarios");
  const user = users?.[0];

  if (!user) {
    methods.handleErrorMessage(loginEmailInput, "Nenhum usuario foi encontrado com este email");
    return;
  }

  const isPasswordCorrect = await methods.checkPassword(user.senha, data.loginSenha);

  if (isPasswordCorrect) {
    console.log(`Login efetuado com sucesso!`);
    // Nao esquecer de fazer isso
    //window.location.href = "/dashboard.html";
    localStorage.setItem("authToken", user.id)
  } else {
    methods.handleErrorMessage(passwordLoginInput, "Senha incorreta");
  }
});