import { methods } from "./methods.js";

const doctorLoginForm = document.querySelector("#doctor-login-form");
const doctorLoginEmailInput = doctorLoginForm.querySelector("#doctorLoginEmail");
const doctorLoginPasswordInput = doctorLoginForm.querySelector("#doctorLoginSenha");

doctorLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(doctorLoginForm));


  const users = await methods.findUserByEmail(data.doctorLoginEmail, "doctors");
  const user = users?.[0];

  if (!user) {
    methods.handleErrorMessage(doctorLoginEmailInput, "Nenhum médico foi encontrado com este email");
    return;
  }

  const isPasswordCorrect = await methods.checkPassword(user.senha, data.doctorLoginSenha);

  if (isPasswordCorrect) {
    console.log("Login efetuado com sucesso!");
    window.location.href = "/dashboard.html";
  } else {
    methods.handleErrorMessage(doctorLoginPasswordInput, "Senha incorreta");
  }
});
