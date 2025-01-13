"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/components/Context/UserContext";
import { NotificationsForms } from "@/components/Notifications/NotificationsForms";
import { validationLogin } from "@/components/Validate/ValidationLogin";

function LoginForm() {
  
  const { signIn } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errors, setErrors] = useState({} as { [key: string]: string });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    const { errors } = validationLogin({ ...userData, [name]: value });
    setErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formIsValid, errors } = validationLogin(userData);

    if (formIsValid) {
      const credentials = {
        email: userData.email,
        password: userData.password,
      };

      try {
        const success = await signIn(credentials);
        console.log(success); 
        if (success) {
          setNotificationMessage("Has ingresado correctamente");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 2000);
          router.push("/");
        } else {
          setNotificationMessage("Usuario o contraseña incorrectos");
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
        
          } catch {
        setNotificationMessage("Ocurrió un error, intenta de nuevo");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de correo */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
              className="w-full mt-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
          </div>


          {/* Campo de contraseña */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                 placeholder="Contraseña"
              className="w-full mt-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
          </div>

          {/* Botón de iniciar sesión */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Ingresar
          </button>
          {showNotification && (
            <div className="absolute top-12 left-0 right-0 mx-auto w-max">
              <NotificationsForms message={notificationMessage} />
            </div>
          )}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-green-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
