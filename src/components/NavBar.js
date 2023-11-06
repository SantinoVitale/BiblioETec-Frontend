import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import { useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    await axios.get("/api/users/logout")
    .then((res) => {
      if(!res.data.valid)
        toast.error("something went wrong");

      toast.success("Logout succesfully, see you later!");
      navigate("/login");
      setUser(null)
    })
  }

  return (
    
    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-white text-3xl font-semibold p-5">BiblioETec</NavLink>
        <div>
            {user ? (
            <>
            <NavLink to="/form-books" className="text-white text-xl p-5">Retirar Libro</NavLink>
            {user.role === "profesor" && (
              <NavLink to="/book-manager" className="text-white text-xl p-5">Administrar Libros</NavLink>
            )}
              <Menu>
              <MenuHandler>
                <Avatar
                  variant="circular"
                  className="cursor-pointer mr-5"
                  alt='Avatar'
                  src='./img/user.png'
                />
              </MenuHandler>
              <MenuList>
                <MenuItem className="flex items-center gap-2">
                  <i className="bi bi-person-fill"></i>
                  <Typography variant="small" className="font-medium">
                    Mi perfil
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <i className="bi bi-gear-fill"></i>
                  <Typography variant="small" className="font-medium">
                    Editar perfil
                  </Typography>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 ">
                  <i className="bi bi-arrow-bar-right"></i>
                  <Typography variant="small" className="font-medium" onClick={handleLogout}>
                    Cerrar sesión
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
            </>
            ) : (
                <NavLink to="/login" className="text-white text-xl p-5">
                  Login
                </NavLink>
            )}
        </div>
        
    </div>
  );
}

export default NavBar;