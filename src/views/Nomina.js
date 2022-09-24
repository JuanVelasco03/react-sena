import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { baseUrl } from '../ApiRest/baseUrl';
import Cookies from 'universal-cookie';
import HomeWorker from '../views/HomeWorker';

import Nominas from '../componenst/Nominas'

const Nomina = () => {
    const cookies = new Cookies();

  const [nominas, setNominas] = useState([]);
  const documento = parseInt(cookies.get("traDocumento2"));


  const getAllNominas = async() => {
    await axios
    .get(baseUrl + "/" + "nomina")
    .then(response => {
      setNominas(response.data)
    })
  }

  const filteredNominas = nominas.filter(nomina => nomina.traDocumento3 === documento);


  useEffect(() => {
    getAllNominas();
  }, [])

  console.log(filteredNominas);
  return (
    <div>
      <HomeWorker/>
      <br />
      <p>Este es tu  historial de nomina</p>
      <div className="nomina-container" >
      <Nominas dataFilter={filteredNominas} />
      </div>
      <br /><br /><br />
    </div>
  )
}

export default Nomina;