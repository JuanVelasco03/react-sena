import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {Link} from 'react-router-dom'

// import HistorialNomina from "./HistorialNomina";

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';

import '../css/gestornomina.css'

import Home from '../views/Home'



const GestorNomina = () => {
  const [workers, setWorkers] = useState([]);

  const initialState = {
    traDocumento3: '',
    nomNombre: '',
    nomApellido: '',
    nomSalarioestipulado: '',
    nomDeduccionsalario: '',
    nomSaludpension: '',
    nomCesantias: '',
    nomParafiscales: '',
    nomInicio: '',
    nomFin : ''
  }

  const [nominaSeleccionada, setNominaSeleccionada] = useState(initialState);
  const [nominas, setNominas] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);

  const handleChange = (e) => {
    const {name, value}=e.target;
    setNominaSeleccionada({
      ...nominaSeleccionada, [name]: value
    })
  }

  const abrirCerrarModalAgregar = () =>{
    setModalAgregar(!modalAgregar)
  }


  const getAllWorkers = async() => {
    await axios
    // eslint-disable-next-line no-useless-concat
    .get(baseUrl + "/" + "trabajador")
    .then (response => {
      setWorkers(response.data);
    }).catch(error => {
      console.log(error)
    })
  }


  const postWorker = async() => {
    await axios
    // eslint-disable-next-line no-useless-concat
    .post(baseUrl + "/" + "nomina", nominaSeleccionada)
    .then(response => {
    setNominas(nominas.concat(response.data));
    }).catch(error => {
      console.log(error)
    })
        abrirCerrarModalAgregar();
  }

  const selectWorker = (worker) =>{
    console.log(worker)
    setNominaSeleccionada({
      ...nominaSeleccionada,
      traDocumento3: worker.traDocumento,
      nomNombre: worker.traNombre,
      nomApellido: worker.traApellido
    });
    abrirCerrarModalAgregar();
  }


  useEffect (() =>{
    getAllWorkers();
  }, [])
  
  return (
    <>
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
          <Link to={`/historialnomina${worker.traDocumento}`}><button className="btn btn-primary">Historial</button></Link>
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
          <input type="text" name="traDocumento3" className="w-100 mb-2" onChange={handleChange}  value={nominaSeleccionada.traDocumento3} disabled />
          <p className="mb-2">Nombre del trabajador</p>
          <input type="text" name="nomNombre" className="w-100 mb-2" onChange={handleChange}  value={nominaSeleccionada.nomNombre} disabled/>
          <p className="mb-2">Apellido</p>
          <input type="text" name="nomApellido" className="w-100 mb-2" onChange={handleChange}  value={nominaSeleccionada.nomApellido} disabled/>
          <p className="mb-2">Ingrese salario estipulado del trabajador</p>
          <input type="number" name="nomSalarioestipulado" className="w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese la deduccion del salario del trabajador</p>
          <input type="number" name="nomDeduccionsalario" className="w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese el descuento de salud y pension del trabajador</p>
          <input type="number" name="nomSaludpension" className="w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese el descuento de cesantias del trabajador</p>
          <input type="number" name="nomCesantias" className="w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese el descuento de parafiscales  del trabajador</p>
          <input type="number" name="nomParafiscales" className="w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese la fecha de inicio</p>
          <input type="date" name="nomInicio" className="w-100 mb-2" onChange={handleChange}  />
          <p className="mb-2">Ingrese la fecha de fin</p>
          <input type="date" name="nomFin" className="w-100 mb-2" onChange={handleChange}  />
            </div>
            <ModalFooter>
              <button className='btn btn-primary' onClick={postWorker}>Agregar nueva nomina</button>
              <button className='btn btn-danger' onClick={() => abrirCerrarModalAgregar()}>Cancelar</button>
            </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}

export default GestorNomina;