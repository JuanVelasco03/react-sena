import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { baseUrl } from '../ApiRest/baseUrl';
import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const history = useNavigate();
  const cookies = new Cookies();

  const [userLogin, setUserLogin] = useState({
    traDocumento2: "",
    userclave: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserLogin({
      ...userLogin, [name]: value
    });
    // console.log(userLogin)
  }

  const iniciarSesion = async() => {
    await axios
    .get(baseUrl + "/" + "Tblusuarios" + "/" + userLogin.traDocumento2 + "/" + userLogin.userclave)
    .then(response => {
      return response.data;
    }).then(response => {
      if(response.length>0){
        var respuesta = response[0];
        cookies.set("id", respuesta.userid, {path: "/"});
        cookies.set("idrol", respuesta.idrol, {path: "/"});
        cookies.set("traDocumento2", respuesta.traDocumento2, {path: "/"});
        cookies.set("usernombre", respuesta.usernombre, {path: "/"});
        cookies.set("userapellido", respuesta.userapellido, {path: "/"});
        cookies.set("useremail", respuesta.useremail, {path: "/"});
        cookies.set("userclave", respuesta.userclave, {path: "/"});
        alert("Bienvendio de nuevo")
        if(respuesta.idrol === 1 ){
          history('/home');
        }else{
          history('/Principal')
        }
      }else{
        alert("Contraseña o usuario incorrecto")
      }
    }
    )
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(cookies.get("id")){
      history('/home')
    }
  }, [cookies, history])


  return (
<div className='login-background'>
<div className="container">
      <div className="login">
        <div className="contenido">
              <h2>Iniciar sesión</h2>
              <div className="form-group">
                <p>Ingresa tu documento</p>
                <input type="text" name="traDocumento2"  className="i-email" onChange={handleChange} />
              </div>
              <div className="contraseña">
                <p>Contraseña</p>
                <input type="password" name="userclave" className="i-pass" onChange={handleChange} />
                <p><Link className="f-pass" to="/forgetPass">¿Olvidaste tu contraseña?</Link></p>
              </div>
              <input type="button" className='button' onClick={() => iniciarSesion()} value="Inciar sesion" />
          </div>
      </div>
   </div>
</div>
  )
}

export default Login; 

