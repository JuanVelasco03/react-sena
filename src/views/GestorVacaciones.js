import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {Link} from 'react-router-dom'

// import HistorialNomina from "./HistorialNomina";

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';

import Home from '../views/Home'


const GestorVacaciones = () => {
  const [workers, setWorkers] = useState([]);
  const [vacacionSeleccionada, setVacacionSeleccionada] = useState({
    "traDocumento5": "",
    "vacNombre": "",
    "vacApellido": "",
    "vacDiasnormales": "",
    "vacDiasadicionales": "",
    "vacDiastotales": "",
    "vacInicio": "",
    "vacFin": ""
  })

  const [vacaciones, setVacaciones] = useState([])

  const [modalAgregar, setModalAgregar] = useState(false);


  const handleChange = (e) => {
    const {name, value}=e.target;
    setVacacionSeleccionada({
      ...vacacionSeleccionada, [name]: value
    })
    console.log(vacacionSeleccionada);
  }




  const abrirCerrarModalAgregar = () =>{
    setModalAgregar(!modalAgregar)
  }


  const getAllWorkers = async() =>{
    await axios
    .get(baseUrl + "/" + "trabajador")
    .then(response => setWorkers(response.data))
    .catch (error => {
      console.log(error);
    })
  }

  const getAllVacaciones = async() => {
    await axios
    .get(baseUrl + "/" + "Vacacion")
    .then(response => setVacaciones(response.data))
    .catch (error => {
      console.log(error);
    })

  }
  const postVacacione = async() => {
    await axios 
    .post(baseUrl + "/" + "Vacacion", vacacionSeleccionada)
    .then(response => {
      setVacaciones(vacaciones.concat(response.data));
    }).catch(error=> {
      console.log(error);
    })
    abrirCerrarModalAgregar();
  }

  const selectWorker = (worker) => {
    setVacacionSeleccionada({
      ...vacacionSeleccionada,
      traDocumento5: worker.traDocumento,
      vacNombre: worker.traNombre,
      vacApellido: worker.traApellido
    })
    abrirCerrarModalAgregar();
  }

  useEffect(() => {
    getAllWorkers();
    getAllVacaciones();
  }, [])

  // console.log(vacacionSeleccionada)

  // console.log(workers)
  return (
    <div>
    <Home />
    <div className="main-nomina">
    <table className="table table-bordered table-light table-hover mt-4">
    <thead>
    <tr>
    <th>Documento</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
      {workers.map(worker =>(
        <tr key={worker.id}>
          <td>{worker.traDocumento}</td>
          <td>{worker.traNombre}</td>
          <td>{worker.traApellido}</td>
          <td>
            <button className='btn btn-success' onClick={() => selectWorker(worker)}>Agregar</button>
          <Link to={`/historialvacacion${worker.traDocumento}`}><button className="btn btn-primary">Historial</button></Link>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
    </div>
    <Modal isOpen={modalAgregar}>
        <ModalHeader>Insertar nomina de un trabajador</ModalHeader>
        <ModalBody>
        <div>
          <p className="mb-2">Documento del trabajador</p>
          <input type="text" name="traDocumento3" className="w-100 mb-2" onChange={handleChange}  value={vacacionSeleccionada.traDocumento5} disabled />
          <p className="mb-2">Nombre del trabajador</p>
          <input type="text" name="vacNombre" className="w-100 mb-2" onChange={handleChange}  value={vacacionSeleccionada.vacNombre} disabled/>
          <p className="mb-2">Apellido</p>
          <input type="text" name="vacApellido" className="w-100 mb-2" onChange={handleChange}  value={vacacionSeleccionada.vacApellido} disabled/>
          <p className="mb-2">Ingrese los dias normales de las vacaciones</p>
          <input type="number" name="vacDiasnormales" className="input w-100 mb-2" placeholder="Introduce solo dos cifras"  id="monto1" onChange={handleChange}  />
          <p className="mb-2">Ingrese los dias adicionales de las vacaciones</p>
          <input type="number" name="vacDiasadicionales" className="input w-100 mb-2" placeholder="Introduce solo dos cifras" id="monto2" onChange={handleChange}  />
          <p className="mb-2">Los dias totales son:</p>
          <input type="text"  name="vacDiastotales" id="totalinput" className="input w-100 mb-2"  onChange={handleChange}  />
          <p className="mb-2">Ingrese la fecha de inicio de vacaciones</p>
          <input type="date" name="vacInicio" className="input w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese la fecha de fin de vacaciones</p>
          <input type="date" name="vacFin" className="input w-100 mb-2" onChange={handleChange}  />
            </div>
            <ModalFooter>
              <button className='btn btn-primary' onClick={() => postVacacione()} >Agregar nueva nomina</button>
              <button className='btn btn-danger' onClick={() => abrirCerrarModalAgregar()}>Cancelar</button>
            </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
 );
}

export default GestorVacaciones;
