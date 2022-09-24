import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../ApiRest/baseUrl';

import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'

import Cookies from 'universal-cookie';


const ForgetPassword = () => {
  const [documento, setDocumento] = useState('');
  let [email, setEmail] = useState('');
  const [data, setData] = useState({})
  const [user, setUser] = useState({
  "traDocumento2": "",
  "usernombre": "",
  "userapellido": "",
  "useremail": "",
  "userclave": "",
  "idrol": ""
  })
  const history = useNavigate()
  const cookies = new Cookies()

  const handleChange = (e) => {
    setDocumento(e.target.value);
  }

  const handleChange1 = (e) => {
    setEmail(e.target.value);
  }

  const doc = parseInt(documento);

  const searchPass = async() => {
    await axios
    .get(baseUrl + "/" + "Tblusuarios" + "/" + doc)
    .then(response => {
      if(response.data.length>0){
        setData(response.data)
      }else{
        alert("No hemos encontrado tu documento en nuestra base de datos.")
      }
      setUser(response.data[0])
    })
  }

  const valCredentials = () => {
    if(email === user.useremail){
      cookies.set("idpass", user.userid, {path: "/"});
      cookies.set("idrolpass", user.idrol, {path: "/"});
      cookies.set("traDocumento2", user.traDocumento2, {path: "/"});
      cookies.set("usernombre", user.usernombre, {path: "/"});
      cookies.set("userapellido", user.userapellido, {path: "/"});
      cookies.set("useremail", user.useremail, {path: "/"});
      cookies.set("userclave", user.userclave, {path: "/"});
      history('/changePass')
    }else{
      alert("correo incorrecto")
    }
    // console.log(user.useremail);
    // console.log(email);
  }



  useEffect(() => { 

  }, [])

  console.log(email)
  console.log(user.useremail)
  return (
    <div className='body'>
      {data.length === undefined ?      
      <div className="container-recuperar">
          <div className="formulario-recuperar">
              <div className="iniciar-sesion-recuperar">
                <p><Link to="/" className="link-sesion-recuperar"> ➠Iniciar sesión</Link></p>
              </div>
              <div className="contenido-recuperar" >
              <div>
                <h2>Introduce tu documento</h2>
                <input  onChange={handleChange} value={documento} type="text" name="traDocumento"  className="i-email-recuperar" placeholder="Por ejemplo: 1000000000"/>
              </div>
              </div>
          <button type="submit" className="button-recuperar" onClick={() => searchPass()}>validar</button>
          </div>
      </div>
      : 
      <div className="container-recuperar">
      <div className="formulario-recuperar">
          <div className="iniciar-sesion-recuperar">
            <p><Link to="/" className="link-sesion-recuperar"> ➠Iniciar sesión</Link></p>
          </div>
          <div className="contenido-recuperar" >
          <div>
            <h2>Introduce tu correo</h2>
            <input type="email" name="useremail"  className="i-email-recuperar" placeholder="example@gmail.com" onChange={handleChange1} value={email} />
          </div>
          </div>
      <button type="submit" className="button-recuperar" onClick={() => valCredentials()}>validar</button>
      </div>
    </div>
    }
    </div>
  )
}

export default ForgetPassword;