import React from 'react';
import image from '../images/candado-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../ApiRest/baseUrl';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

const ChangePass = () => {  
  const history = useNavigate();
  const cookies = new Cookies();
  const [user, setUser] = useState({
    "traDocumento2": "",
    "usernombre": "",
    "userapellido": "",
    "useremail": "",
    "userclave": "",
    "idrol": ""
    })

  const [passwords, setPasswords] = useState({
    pass1: "",
    pass2: ""
  })

  const documento = parseInt(cookies.get("traDocumento2"))


  const getUser = async() => {
    await axios
    .get(baseUrl + "/" + "Tblusuarios" + "/" + documento)
    .then(response => setUser(response.data[0]))
  } 

  console.log(user);

  const handlePass = (e) => {
    const {name, value} = e.target;
    setPasswords({...passwords, [name]: value})
    setUser({...user, userclave: passwords.pass1})
    console.log()
  }


const changePass = () => {
  if(passwords.pass1 === passwords.pass2){
  updatePass();
  }else{
    alert("No le metio rico")
  }
}

const userid = parseInt(cookies.get("idpass"))

const updatePass = async() =>{
  await axios 
  .put(baseUrl + "/" + "usuario" + "/" + userid, user)
  .catch(error =>{
    console.log(error);
  })
  alert("la contraseña ha sido actualizada correctamente")
  history("/")
}

console.log(user)

useEffect(() => {
  getUser();
}, [])

  return (
    <div className=''>
        <div className="content-pass form-group">
              <p className='title-pass'>Cambio contraseña</p>
              <img src={image} alt="candado" className='image' />
              <input type="password"  name="pass1" className="form-control " placeholder='Nueva contraseña' onChange={handlePass}/>
              <input type="password" name="pass2" className="form-control" placeholder='Repetir contraseña' onChange={handlePass}/>
              <div className="botons">
              <button value="" className="button-pass" onClick={() => changePass()}> Actualizar contraseña </button>
              </div>
        </div>
        <div className='foot-pass'>
              <Link className='text-pass' to="/" > ➠ Volver a iniciar sesion</Link>
        </div>
      </div>
  )
}

export default ChangePass;