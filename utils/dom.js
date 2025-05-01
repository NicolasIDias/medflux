export async function handleErrorMessage(el, msg) {
  let error = el.nextElementSibling;
  if (!error || !error.classList.contains("message-error")) {
    error = document.createElement("p");
    error.classList.add("message-error");
    el.insertAdjacentElement("afterend", error);
  }
  error.style.color = "red";
  error.innerText = msg;
}