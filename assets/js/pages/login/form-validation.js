import { errorMessage, findUserByEmail, checkPassword } from "./index.js";
import { getUserId } from "../../../../services/auth.js";

const loginForm = document.querySelector("#login-form")
const loginEmailInput = loginForm.querySelector("#loginEmail")
const passwordLoginInput = loginForm.querySelector("#loginSenha")

window.addEventListener("load", async () => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("id")) {
    const id = await getUserId(); 
    params.set("id", id);
    window.location.search = params.toString(); 
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  const users = await findUserByEmail(data.loginEmail);
  const user = users?.[0];

  if (!user) {
    errorMessage(loginEmailInput, "Nenhum usuario foi encontrado com este email");
    return;
  }

  const isPasswordCorrect = await checkPassword(user.senha, data.loginSenha);

  if (isPasswordCorrect) {
    //TEMPORARIO, APENAS PRA SABER SE DEU CERTO
    console.log(`Login efetuado com sucesso!`);
    window.location.href = `index.html?id=${await getUserId()}`    
  } else {
    errorMessage(passwordLoginInput, "Senha incorreta");
  }
});