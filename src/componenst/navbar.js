import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Route, Routes} from 'react-router-dom'



const Navbar = () => {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand df" to="/">SoulMedical</Link>
    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/gestortrabajadores">Gestor de trabajadores</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gestornomina">Gestor de nomina de trabajador</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gestorasistencia">Gestor de asistencia de trabajador</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gestorvacaciones">Gestor de vacaciones de trabajador</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gestorusuarios">Gestor de usuarios de trabajador</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;