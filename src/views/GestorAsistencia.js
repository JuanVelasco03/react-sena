import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, ModalBody, ModalFooter, ModalHeader, Navbar} from 'reactstrap';

import {Link} from 'react-router-dom'

// import HistorialNomina from "./HistorialNomina";

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';


import Home from '../views/Home'

const GestorAsistencia = () => {
  const [worker, setWorker] = useState([]);
  const [horario, setHorario] = useState({
    traDocumento4: "",
    horNombre: "",
    horApellido: "",
    horLlegada: "",
    horSalida: ""
  });
  const [modalAgregar, setModalAgregar] = useState(false)

  const abrirCerrarModalAgregar = () => {
    setModalAgregar(!modalAgregar)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setHorario({...horario, [name]: value
    })
  console.log(horario);
  }

  const getAllWorkers = async() => {
    // eslint-disable-next-line no-useless-concat
    await axios.get(baseUrl + "/" + "trabajador")
    .then(response => {
      setWorker(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const postHorario = async() => {
    await axios
    // eslint-disable-next-line no-useless-concat
    .post(baseUrl + "/" + "Horario", horario)
    .then(response => {
      setHorario(horario.concat(response.data));
    }).catch(error => {
      console.log(error);
    })
    abrirCerrarModalAgregar();
  }

  const selectWorker = (worker) => {
    setHorario({
      ...horario,
      traDocumento4: worker.traDocumento,
      horNombre: worker.traNombre,
      horApellido: worker.traApellido
    });
    abrirCerrarModalAgregar();
  }

  useEffect(() => {
    getAllWorkers();
  })

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
      {worker.map(worker =>(
        <tr key={worker.id}>
          <td>{worker.traDocumento}</td>
          <td>{worker.traNombre}</td>
          <td>{worker.traApellido}</td>
          <td>
          <button className='btn btn-success' onClick={() => selectWorker(worker)}>Agregar</button>
          <Link to={`/historialhorario${worker.traDocumento}`}><button className="btn btn-primary">Historial</button></Link>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
    </div>

    <Modal isOpen={modalAgregar}>
    <ModalHeader>Inserte el horario del trabajador</ModalHeader>

    <ModalBody>
    <p className="mb-2">Documento de trabajador</p>
    <input type="text" name="traDocumento4" className="input mb-2 w-100" value={horario.traDocumento4} disabled />
    <p className="mb-2">Nombre de trabajador</p>
    <input type="text" name="horNombre" className="input mb-2 w-100" value={horario.horNombre} disabled />
    <p className="mb-2">Apellido de trabajador</p>
    <input type="text" name="horApellido" className="input mb-2 w-100" value={horario.horApellido} disabled />
    <div className="i-time">
    <div>
      <p className="p1 mb-2">Hora de llegada</p>
      <input type="datetime-local" name="horLlegada" className="hor_llegada mb-2 w-100" onChange={handleChange} />
    </div>
    <div>
      <p className="p2 mb-2">Hora de salida</p>
      <input type="datetime-local" name="horSalida" className="hor_salida mb-2 w-100" onChange={handleChange} />
    </div>
    </div>
    </ModalBody>
    <ModalFooter>
      <button className='btn btn-primary' onClick={() => postHorario()}>Agregar nuevo horario</button>
      <button className='btn btn-danger' onClick={() => abrirCerrarModalAgregar()} >Cancelar</button>   
    </ModalFooter>
    </Modal>
  </div>

  );
}

export default GestorAsistencia;