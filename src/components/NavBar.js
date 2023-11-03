import { NavLink } from 'react-router-dom';
import '../App.css';
import { useContext } from 'react';

function NavBar() {
  const {user} = useContext();

  const handleLogout = () => {
    
  }

  return (
    
    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-white text-3xl font-semibold p-5">BiblioETec</NavLink>
        <div>
            <NavLink to="/form-books" className="text-white text-xl p-5">Retirar Libro</NavLink>
            <NavLink to="/book-manager" className="text-white text-xl p-5">Administrar Libros</NavLink>
            {user ? (
          <button className="text-white text-xl p-5" onClick={handleLogout}>
            Logout
          </button>
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