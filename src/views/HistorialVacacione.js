import { useState, useEffect } from "react";
import { baseUrl } from "../ApiRest/baseUrl";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import Home from '../views/Home'

import {useParams, Link } from 'react-router-dom';


const HistorialVacacion = () => {

  let { userDocument } = useParams();
  const [vacaciones, setVacaciones] = useState([]);
  const documento = parseInt(userDocument);
  const [modalDelete, setModalDelete] = useState(false)
  const [currentId, setCurrentId] = useState("");


  const openCloseModalDelete = (id) => {
    setCurrentId(id);
    setModalDelete(!modalDelete);
  }


  const getAllVacaciones = async() => {
    await axios
    .get(baseUrl + "/" + "Vacacion")
    .then(response => setVacaciones(response.data))
    .catch (error => {
      console.log(error);
    })
  }

  const deleteHorario = async() => {
    await axios
    .delete(baseUrl + "/" + "vacacion" + "/" + currentId)
    .catch(error => {
      console.log(error);
    })
    openCloseModalDelete(!false)
  }

  const vacacionesFiltradas = vacaciones.filter(vacacion=>vacacion.traDocumento5 === documento);

    useEffect(() => {
    getAllVacaciones();
    }, [modalDelete])


  return (
    <div>
      <Home/>
      <br />
      <Link to="/gestorvacaciones"><button className="btn btn-primary">Volver atras</button></Link>
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
              <td>Accion</td>
            </tr>
          </thead>
          <tbody>
            {vacacionesFiltradas.map(vacacion => (
              <tr key={vacacion.vacid}>
                <td>{vacacion.traDocumento5}</td>
                <td>{vacacion.vacNombre}</td>
                <td>{vacacion.vacApellido}</td>
                <td>{vacacion.vacDiasnormales}</td>
                <td>{vacacion.vacDiasadicionales}</td>
                <td>{vacacion.vacDiastotales}</td>
                <td>{vacacion.vacInicio}</td>
                <td>{vacacion.vacFin}</td>
                <td>
                <button className="btn btn-danger" onClick={() => openCloseModalDelete(vacacion.vacid)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalDelete}>
        <ModalBody>
        ¿Estas seguro de que deseas eliminar esta vacacion del trabajador?.
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => deleteHorario()}>Si</button>
          <button className='btn btn-secondary'onClick={() => openCloseModalDelete()}>No</button>
        </ModalFooter>
      </Modal>
    <br />
    <br />
    </div>
  )
}

export default HistorialVacacion;