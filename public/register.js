const form = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
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
