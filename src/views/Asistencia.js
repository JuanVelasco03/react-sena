import HomeWorker from '../views/HomeWorker';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { baseUrl } from '../ApiRest/baseUrl';
import Cookies from 'universal-cookie';





const Asistencia = () => {
  const cookies = new Cookies();

  const [asistencias, setAsistencias] = useState([]);
  const documento = parseInt(cookies.get("traDocumento2"))

  const getAsistencias = async() => {
    await axios 
    .get(baseUrl + "/" + "horario")
    .then(response => setAsistencias(response.data))
  }

  const diasFiltered = asistencias.filter(hor => hor.traDocumento4 === documento)


  const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    params: {lat: '4.71', lon: '-74'},
    headers: {
      'X-RapidAPI-Key': '21573c2e73msh89299e753d4df00p14a25bjsnbc3374d2701b',
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
  };


  useEffect(() => {
    getAsistencias();
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])


  


  console.log(diasFiltered)
  return (
    <div>
      <HomeWorker />
      <br />
      <p>Aqui consultas tus dias de Asistencia</p>
      <div className="table-horario">
      <table className="table table-bordered table-light table-hover mt-4">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Hora llegada</th>
            <th>Hora salida</th>
          </tr>
        </thead>
        <tbody>
          {diasFiltered.map(horario => (
            <tr key={horario.horUserid}>
              <td>{horario.traDocumento4}</td>
              <td>{horario.horNombre}</td>
              <td>{horario.horApellido}</td>
              <td>{horario.horLlegada}</td>
              <td>{horario.horSalida}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <br /><br /><br />
    </div>
  )
}

export default Asistencia;