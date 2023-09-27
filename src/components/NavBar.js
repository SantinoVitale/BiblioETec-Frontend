import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar() {
  return (
    
    <div className="bg-blue-700 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-white text-3xl font-semibold p-5">BiblioETec</NavLink>
        <div>
            <NavLink to="/form-books" className="text-white text-xl p-5">Retirar Libro</NavLink>
        </div>
        
    </div>
  );
}

export default NavBar;