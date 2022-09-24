import HomeWorker from '../views/HomeWorker'
import Cookies from 'universal-cookie';
import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";



const Principal = () => {
  const cookies = new Cookies();


  useEffect(() => {

  }, [])

  return (
    <div>
    <HomeWorker />
    <p>Bienvenido de nuevo trabajador {cookies.get("usernombre")}</p>
    </div>
  )
}

export default Principal;