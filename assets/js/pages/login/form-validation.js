const loginForm = document.querySelector("#login-form")
const loginEmailInput = loginForm.querySelector("#loginEmail")
const passwordLoginInput = loginForm.querySelector("#loginSenha")

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  console.log(data)
  const users = await findUserByEmail(data.loginEmail);
  const user = users[0];
  if (user) {
    checkPassword(user, data.loginSenha);
  } else {
    handleErrorMessage(loginEmailInput, "Nenhum usuário encontrado com este email");
  }
})

async function findUserByEmail(email) {
  const response = await fetch(`http://localhost:3000/usuarios?email=${email}`);
  const user = await response.json();
  return user;
}

function handleErrorMessage(element, message) {
  let error = element.nextElementSibling;

  if (!error || !error.classList.contains("message-error")) {
    error = document.createElement("p");
    error.classList.add("message-error");
    element.insertAdjacentElement("afterend", error);
  }

  error.style.display = "block";
  error.style.color = 'red'
  error.innerText = message;
}