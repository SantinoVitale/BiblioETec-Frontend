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
      axios.get("/api/users/getUser").then((data) => {
        console.log(data);
        if(!data.data.valid)
        {
          toast.error("Not logged, please log in")
          navigate("/login")
        }
        else
          setUser(data.data.payload)
      })
    }
  },[])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}