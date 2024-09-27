import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({children}){
  const navigate = useNavigate();
  const [user, setUser] =useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      toast.error("Acceso no autorizado, necesita estar logueado");
      setUser(null);
      setUserLoading(false);
      Cookies.remove("token"); // Eliminar el JWT de las cookies
      navigate("/login");
    };
    
    const token = Cookies.get("token");    

    if (token) {
      axios
        .get("/api/users/getUser", {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el header
          },
        })
        .then((response) => {
          if (response.data.valid) {
            setUser(response.data.payload);
            setUserLoading(false);
            if(window.location.pathname === "/login") navigate("/home")
          } else{
            handleUnauthorized();
          }
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
          handleUnauthorized();
        });
    } else if(window.location.pathname !== "/register" && window.location.pathname !== "/recover-pass") {
      handleUnauthorized();
    }
  },[navigate])

  return (
    <UserContext.Provider value={{user, setUser, userLoading}}>
      {children}
    </UserContext.Provider>
  )
}