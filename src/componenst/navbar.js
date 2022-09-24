import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
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
    <div>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand df" to="/home">SoulMedical</Link>
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
          <div className="cerrarsesion">
            <li>
              <button className='btn btn-secondary' onClick={cerrarSesion}>Cerrar sesion</button>
            </li>
          </div>
        </div>
        </nav>
      </div>
      <div>
      </div>
    </div>
  );
}

export default Navbar;