import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {Link} from 'react-router-dom'

import HistorialNomina from "./HistorialNomina";

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';

import '../css/gestornomina.css'



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
          <p>Documento del trabajador</p>
          <input type="text" name="traDocumento3" onChange={handleChange}  value={nominaSeleccionada.traDocumento3} disabled />
          <p>Nombre del trabajador</p>
          <input type="text" name="nomNombre" onChange={handleChange}  value={nominaSeleccionada.nomNombre} disabled/>
          <p>Apellido</p>
          <input type="text" name="nomApellido" onChange={handleChange}  value={nominaSeleccionada.nomApellido} disabled/>
          <p>Ingrese salario estipulado del trabajador</p>
          <input type="number" name="nomSalarioestipulado" onChange={handleChange}  />
          <p>Ingrese la deduccion del salario del trabajador</p>
          <input type="number" name="nomDeduccionsalario" onChange={handleChange}  />
          <p>Ingrese el descuento de salud y pension del trabajador</p>
          <input type="number" name="nomSaludpension" onChange={handleChange}  />
          <p>Ingrese el descuento de cesantias del trabajador</p>
          <input type="number" name="nomCesantias" onChange={handleChange}  />
          <p>Ingrese el descuento de parafiscales  del trabajador</p>
          <input type="number" name="nomParafiscales" onChange={handleChange}  />
          <p>Ingrese la fecha de inicio</p>
          <input type="date" name="nomInicio" onChange={handleChange}  />
          <p>Ingrese la fecha de fin</p>
          <input type="date" name="nomFin" onChange={handleChange}  />
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