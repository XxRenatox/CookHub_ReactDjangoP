import Swal from "sweetalert2";

export const verificar = (forms) => {
  let isValid = true;
  let warningMessages = [];

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.remove("border-red-500", "focus:border-red-500");
      if (!input.value) {
        input.classList.add("border-red-500", "focus:border-red-500");
        isValid = false;
        warningMessages.push(`Por favor, completa el campo ${input.placeholder}.`);
      }
      if (input.type === "email") {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(input.value)) {
          input.classList.add("border-red-500", "focus:border-red-500");
          isValid = false;
          warningMessages.push("Por favor, ingresa un correo electrónico válido.");
        }
      }
    });
  });

  if (!isValid) {
    Swal.fire({
      icon: "warning",
      title: "Error de Validación",
      text: warningMessages.join("\n"),
    });
  }

  return isValid;
};

const iniciarSesion = async (correo_electronico, contrasena) => {
  const response = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo_electronico, contrasena }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }
  console.log(response.json())
  return await response.json();
};

const registrarUsuario = async (nombre, correo_electronico, contrasena) => {
  const response = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, correo_electronico, contrasena }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar usuario");
  }

  return await response.json();
};

export const handleSubmit = async (e, navigate, type) => {
  e.preventDefault();

  if (type === "Login") {
    const correo_electronico = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;

    if (verificar([document.querySelector("form")])) {
      try {
        const result = await iniciarSesion(correo_electronico, contrasena);

        if (result) {
          // Verificar si la cuenta está verificada
          if (result.error) {
            Swal.fire({
              icon: "warning",
              title: "Cuenta No Verificada",
              text: "Tu cuenta no está verificada. Por favor, verifica tu correo electrónico.",
            });
            return;
          }

          Swal.fire({
            icon: "success",
            title: "¡Acceso concedido!",
            text: "Tu cuenta ha sido verificada correctamente. Serás redirigido al panel de control.",
            confirmButtonText: "Vamos allá!",
            customClass: {
              confirmButton:
                "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/Dashboard");
            }
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: error.message || "Verifica tus credenciales y vuelve a intentarlo.",
        });
      }
    }
  } else {
    const fullName = document.getElementById("fullName").value;
    const correo_electronico = document.getElementById("registerEmail").value;
    const contrasena = document.getElementById("registerPassword").value;

    if (verificar([document.querySelector("form")])) {
      try {
        const result = await registrarUsuario(fullName, correo_electronico, contrasena);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Ahora puedes iniciar sesión con tu nueva cuenta.",
          });
          navigate("/Dashboard");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error de Registro",
          text: error.message || "No se pudo registrar. Por favor, intenta de nuevo.",
        });
      }
    }
  }
};
