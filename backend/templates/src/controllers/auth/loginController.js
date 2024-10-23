import Swal from "sweetalert2";

export const verificar = (forms) => {
  let isValid = true;

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.remove("border-red-500", "focus:border-red-500");
      if (!input.value) {
        input.classList.add("border-red-500", "focus:border-red-500");
        isValid = false;
        Swal.fire({
          icon: "warning",
          title: "Campo Vacío",
          text: `Por favor, completa el campo ${input.placeholder}.`,
        });
      }
      if (input.type === "email") {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(input.value)) {
          input.classList.add("border-red-500", "focus:border-red-500");
          isValid = false;
          Swal.fire({
            icon: "error",
            title: "Correo Inválido",
            text: "Por favor, ingresa un correo electrónico válido.",
          });
        }
      }
    });
  });

  return isValid;
};

const iniciarSesion = async (email, passwd) => {
  const response = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, passwd }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return await response.json();
};

const registrarUsuario = async (username, email, passwd) => {
  const response = await fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, passwd }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al registrar usuario");
  }

  return await response.json();
};

export const handleSubmit = async (e, navigate, type) => {
  console.log(type);
  e.preventDefault();

  if (type === "Login") {
    const email = document.getElementById("email").value; // Obtiene el valor del campo email
    const passwd = document.getElementById("password").value; // Obtiene el valor del campo contraseña

    if (verificar([document.querySelector("form")])) {
      try {
        const result = await iniciarSesion(email, passwd);

        if (result) {
          console.log(result)
          // Verificar si la cuenta está verificada
          if (result.error) {
            Swal.fire({
              icon: "warning",
              title: "Cuenta No Verificada",
              text: "Tu cuenta no está verificada. Por favor, verifica tu correo electrónico.",
            });
            return; // Detener la ejecución aquí
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
        console.log(error);
        // Aquí eliminamos la lógica de crear una nueva cuenta
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Verifica tus credenciales y vuelve a intentarlo.",
        });
      }
    }
  } else {
    // Registro
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("registerEmail").value;
    const passwd = document.getElementById("registerPassword").value;

    if (verificar([document.querySelector("form")])) {
      try {
        const result = await registrarUsuario(fullName, email, passwd);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Ahora puedes iniciar sesión con tu nueva cuenta.",
          });
          navigate("/Dashboard"); // Redirigir a la página del panel de control
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

