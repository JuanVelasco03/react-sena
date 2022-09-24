import { useState, useEffect } from "react";
import { baseUrl } from "../ApiRest/baseUrl";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import Home from '../views/Home'

import {useParams, Link } from 'react-router-dom';

const HistorialNomina = () => {
  let { userDocument } = useParams();
  const [horarios, setHorarios] = useState([]);
  const documento = parseInt(userDocument);
  const [modalDelete, setModalDelete] = useState(false)
  const [currentId, setCurrentId] = useState("");

  const openCloseModalDelete = (id) => {
    setCurrentId(id);
    setModalDelete(!modalDelete);
  }

  const getAllHorarios = async() => {
    await axios 
    .get(baseUrl + "/" + "horario")
    .then(response => {
      setHorarios(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const horarioFiltrado = horarios.filter(horario=>horario.traDocumento4 === documento)
  // console.log(horarioFiltrado)



  const deleteHorario = async() => {
    await axios
    .delete(baseUrl + "/" + "horario" + "/" + currentId)
    .catch(error => {
      console.log(error);
    })
    openCloseModalDelete(!false)
  }

  useEffect(() => {
    getAllHorarios();
  }, [modalDelete])


  // console.log(currentId)
  return (
    <div>
      <Home />
      <br />
      <Link to="/gestorasistencia"><button className="btn btn-primary">Volver atras</button></Link>
      <div className="table-horario">
      <table className="table table-bordered table-light table-hover mt-4">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Hora llegada</th>
            <th>Hora salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarioFiltrado.map(horario => (
            <tr key={horario.horUserid}>
              <td>{horario.traDocumento4}</td>
              <td>{horario.horNombre}</td>
              <td>{horario.horApellido}</td>
              <td>{horario.horLlegada}</td>
              <td>{horario.horSalida}</td>
              <td>
                <button className="btn btn-danger" onClick={() => openCloseModalDelete(horario.horUserid)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Modal isOpen={modalDelete}>
        <ModalBody>
        ¿Estas seguro de que deseas eliminar esta asistencia del trabajador?.
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => deleteHorario()}>Si</button>
          <button className='btn btn-secondary'onClick={() => openCloseModalDelete()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default HistorialNomina;