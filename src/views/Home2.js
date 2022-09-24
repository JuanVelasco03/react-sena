import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import Home from '../views/Home';



const Home2 = () => {
  const cookies = new Cookies();



  useEffect(() => {
  }, []);

  return (
<div>  
  <Home />
  <br />
  {/* <p>Documento: {cookies.get("traDocumento2")}</p>
  <p>Nombres: {cookies.get("usernombre")}</p>
  <p>Apellidos: {cookies.get("userapellido")}</p>
  <p>Email:{cookies.get("useremail")} </p>
  <p>Contraseña: {cookies.get("userclave")} </p> */}
  <p>Bienvenido de nuevo Administrador {cookies.get("usernombre")} {cookies.get("userapellido")}</p>
</div>
  )
}

export default Home2;