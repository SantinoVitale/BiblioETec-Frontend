import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar() {
  return (
    
    <div className="bg-blue-700 h-20 flex items-center justify-between">
        <h1 className="text-white text-3xl font-semibold p-5">BiblioETec</h1>
        <div>
            <NavLink to="/books" className="text-white text-xl p-5">Libros</NavLink>
            <NavLink to="/form-books" className="text-white text-xl p-5">Retirar Libro</NavLink>
        </div>
        
    </div>
  );
}

export default NavBar;