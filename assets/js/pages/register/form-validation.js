const registerForm = document.querySelector("#register-form")
const registerNameInput = registerForm.querySelector("#name")
const registerEmailInput = registerForm.querySelector("#email")
const registerPasswordInput = registerForm.querySelector("#senha")
const registerPasswordConfirmInput = registerForm.querySelector("#confirmedPassword")


registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm));
  console.log(data)
  const emailExists = await checkIfEmailHasExists(data.email)
  const passwordInvalid = await validatePassword(data.senha, data.confirmedPassword)

  if (!emailExists && !passwordInvalid) await register(data)
})

async function register(data) {
  const response = await fetch(`http://localhost:3000/usuarios`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })

  console.log("Chegou ate aqui")
  return response.json()
}


async function checkIfEmailHasExists(email) {
  const users = await findByEmail(email);
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    handleErrorMessage(registerEmailInput, "Este email ja esta sendo utilizado")
    return true
  }
  return false
}

async function findByEmail(email) {
  const response = await fetch(`http://localhost:3000/usuarios?email=${email}`);
  const users = await response.json();
  return users;
}

async function validatePassword(password, confirmedPassword) {
  if (password != confirmedPassword) {
    handleErrorMessage(registerPasswordConfirmInput, "As senhas nao coincidem")
    return true
  }
  else if (password.length < 8) {
    handleErrorMessage(registerPasswordConfirmInput, "A senha deve ter no minimo 8 caracteres")
    return true
  }
  return false
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