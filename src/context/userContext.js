import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({children}){
  const navigate = useNavigate();
  const [user, setUser] =useState(null);

  useEffect(() => {
    if(!user){
      if(window.location.pathname !== "/recover-pass"){
        axios.get("/api/users/getUser").then((data) => {
          if(!data.data.valid)
          {
            if(window.location.pathname !== "/register")
              navigate("/login");
  
            toast.error("Not logged, please log in");
            setUser(null);
          }
          else
            setUser(data.data.payload)
        })
      }
    }
  },[])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}