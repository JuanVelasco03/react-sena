import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


const Navbarworker = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const history = useNavigate();

  const cerrarSesion = () => {
    cookies.remove("id", {path: "/"})
    cookies.remove("traDocumento2", {path: "/"});
    cookies.remove("usernombre",  {path: "/"});
    cookies.remove("userapellido", {path: "/"});
    cookies.remove("useremail",  {path: "/"});
    cookies.remove("userclave", {path: "/"});
    history('/');
  }

  useEffect(() => {
    if(!cookies.get("id")){
      history('/')
    }
  }, [cookies, history]);

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand df" to="/principal">SoulMedical</Link>
    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/datospersonales">Consultar mis datos personales</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/nomina">Consultar mi nomina</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vacaciones">Consultar mis vacaciones</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/asistencia">Consultas mis dias de asistencia</Link>
        </li>
      </ul>
    </div>
    <div className="cerrarsesion">
      <li>
        <button className='btn btn-secondary' onClick={cerrarSesion}>Cerrar sesion</button>
      </li>
    </div>
  </div>
</nav>
  );
}

export default Navbarworker;