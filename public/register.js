const form = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    errorMessage.textContent = error.message;
  } else {
    errorMessage.textContent = "";
    // Делаем что-то после успешной регистрации, например, перенаправляем пользователя на главную страницу
    window.location.href = "/";
  }
});
