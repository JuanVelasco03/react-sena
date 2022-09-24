import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { baseUrl } from '../ApiRest/baseUrl';
import Cookies from 'universal-cookie';
import HomeWorker from '../views/HomeWorker';

const Vacaciones = () => {
  const [vacaciones, setVacaciones] = useState([]);
  const cookies = new Cookies();
  const documento = parseInt(cookies.get("traDocumento2"));

  const getVacaciones = async() => {
    await axios
    .get(baseUrl + "/" + "vacacion")
    .then(response => (
      setVacaciones(response.data)
    ))
  }

  const vacFiltered = vacaciones.filter(vac => vac.traDocumento5 === documento);

  useEffect(() => {
    getVacaciones();
  }, [])

  console.log(documento);
  console.log(vacFiltered);
  return (
    <div>
      <HomeWorker />
      <br />
      <p>Este es tu historial de vacaciones</p>
      <div className="table-vacaciones">
        <table className="table table-bordered table-light table-hover mt-4">
          <thead>
            <tr>
              <td>Documento</td>
              <td>Nombre</td>
              <td>Apellido</td>
              <td>Dias normales</td>
              <td>Dias adicionales</td>
              <td>Dias totales</td>
              <td>Fecha de inicio</td>
              <td>Fecha de fin</td>
            </tr>
          </thead>
          <tbody>
            {vacFiltered.map(vacacion => (
              <tr key={vacacion.vacid}>
                <td>{vacacion.traDocumento5}</td>
                <td>{vacacion.vacNombre}</td>
                <td>{vacacion.vacApellido}</td>
                <td>{vacacion.vacDiasnormales}</td>
                <td>{vacacion.vacDiasadicionales}</td>
                <td>{vacacion.vacDiastotales}</td>
                <td>{vacacion.vacInicio}</td>
                <td>{vacacion.vacFin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br /><br /><br />
    </div>
  )
}

export default Vacaciones;