import { Endpoints, post } from "../../core/http.js";

const registerForm = document.querySelector("#register-form");
const registerNameInput = registerForm.querySelector("#name");
const registerBirthDateInput = registerForm.querySelector("#birthDate");
const registerPhoneInput = registerForm.querySelector("#telefone");
const registerEmailInput = registerForm.querySelector("#email");
const registerCEPInput = registerForm.querySelector("#cep");
const registerAddressInput = registerForm.querySelector("#endereco");
const registerCityInput = registerForm.querySelector("#cidade");
const registerStateInput = registerForm.querySelector("#estado");
const registerConvenioSelect = registerForm.querySelector("#convenio");
const registerPasswordInput = registerForm.querySelector("#senha");
const registerPasswordConfirmInput = registerForm.querySelector("#confirmedPassword");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearAllErrors();

  const data = Object.fromEntries(new FormData(registerForm));

  const emailExists = await checkIfEmailHasExists(data.email);
  const passwordInvalid = validatePassword(data.senha, data.confirmedPassword);
  const missingFields = validateRequiredFields(data);

  if (emailExists || passwordInvalid || missingFields) return;
  delete data.confirmedPassword;        
  data.dataNascimento = new Date(data.dataNascimento).toISOString();
  data.filaId = null;
  data.problemasRelatados = [];
  data.relatoriosMedicosIds = [];
  const now = new Date().toISOString();
  data.criadoEm = now;
  data.atualizadoEm = now;

  await register(data);
});

async function register(data) {
  const res = await post(Endpoints.USUARIOS, data)
  if (!res.ok) {
    console.error("Erro ao criar usuário:", res.statusText);
    return;
  }
  const created = await res.json();
  console.log("Usuário criado:", created);
}

async function checkIfEmailHasExists(email) {
  const users = await findByEmail(email);
  const userExists = users.some(u => u.email === email);
  if (userExists) handleErrorMessage(registerEmailInput, "Este email já está em uso");
  return userExists;
}

async function findByEmail(email) {
  const res = await fetch(`http://localhost:3000/usuarios?email=${encodeURIComponent(email)}`);
  return await res.json();
}

function validatePassword(password, confirmed) {
  if (password !== confirmed) {
    handleErrorMessage(registerPasswordConfirmInput, "As senhas não coincidem");
    return true;
  }
  if (password.length < 8) {
    handleErrorMessage(registerPasswordInput, "A senha deve ter ao menos 8 caracteres");
    return true;
  }
  return false;
}

function validateRequiredFields(data) {
  let missing = false;
  const camposObrigatorios = {
    nome: registerNameInput,
    dataNascimento: registerBirthDateInput,
    telefone: registerPhoneInput,
    email: registerEmailInput,
    cep: registerCEPInput,
    endereco: registerAddressInput,
    cidade: registerCityInput,
    estado: registerStateInput,
    senha: registerPasswordInput
  };
  Object.entries(camposObrigatorios).forEach(([key, el]) => {
    if (!data[key] || data[key].trim() === "") {
      handleErrorMessage(el, "Campo obrigatório");
      missing = true;
    }
  });
  return missing;
}

function clearAllErrors() {
  registerForm.querySelectorAll(".message-error").forEach(e => e.remove());
}

function handleErrorMessage(el, msg) {
  let error = el.nextElementSibling;
  if (!error || !error.classList.contains("message-error")) {
    error = document.createElement("p");
    error.classList.add("message-error");
    el.insertAdjacentElement("afterend", error);
  }
  error.style.color = "red";
  error.innerText = msg;
}
