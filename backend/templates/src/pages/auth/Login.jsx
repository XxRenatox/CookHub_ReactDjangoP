import React, { useState } from 'react';
import { FacebookIcon, GoogleIcon } from '../common/Icons';
import { useNavigate } from 'react-router-dom';
import { handleSubmit } from '../../controllers/auth/loginController';


function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage:  `url('https://i.pinimg.com/736x/0a/b7/27/0ab727fcfd30b338e9f68d6709aa5eec.jpg')` }}>
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-lg w-full max-w-sm">
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} onSubmit={(e) => handleSubmit(e, navigate, "Login")} />
        ) : (
          <RegisterForm toggleForm={toggleForm} onSubmit={(e) => handleSubmit(e, navigate, "Register")} />
        )}
      </div>
    </div>
  );
}

const InputField = ({ id, label, type }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
    <input
      type={type}
      id={id}
      className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder={label}
    />
  </div>
);

const LoginForm = ({ toggleForm, onSubmit }) => (
  <>
    <h2 className="text-white text-center text-2xl font-semibold mb-6">¡Bienvenido de nuevo!</h2>
    <form onSubmit={onSubmit}>
      <InputField id="email" label="Correo Electrónico" type="email" />
      <InputField id="password" label="Contraseña" type="password" />
      <div className="text-right mb-4">
        <a href="#" className="text-gray-400 text-sm">¿Olvidaste tu contraseña?</a>
      </div>
      <button type="submit" className="w-full bg-green-600 text-gray-800 py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors mb-4">
        Iniciar Sesion
      </button>
      <button type="button" className="w-full bg-white text-gray-800 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors mb-4">
        <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-2" />
        Iniciar Sesion con Google
      </button>
      <button type="button" className="w-full bg-blue-800 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors mb-4">
        <img src={FacebookIcon} alt="Facebook" className="w-5 h-5 mr-2" />
        Iniciar Sesion con Facebook
      </button>
    </form>
    <p className="text-center text-gray-400 text-sm">
      ¿No tienes una cuenta? <a href="#" onClick={toggleForm} className="text-blue-500">Regístrate</a>
    </p>
  </>
);

const RegisterForm = ({ toggleForm, onSubmit }) => (
  <>
    <h2 className="text-white text-center text-2xl font-semibold mb-6">Crea una nueva cuenta</h2>
    <form onSubmit={onSubmit}>
      <InputField id="fullName" label="Nombre Completo" type="text" />
      <InputField id="registerEmail" label="Correo Electrónico" type="email" />
      <InputField id="registerPassword" label="Contraseña" type="password" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4">
        Registrarse
      </button>
    </form>
    <p className="text-center text-gray-400 text-sm">
      ¿Ya tienes una cuenta? <a href="#" onClick={toggleForm} className="text-blue-500">Inicia Sesión</a>
    </p>
  </>
);

export default Login;
