import { useState, useEffect } from "react";
import { baseUrl } from "../ApiRest/baseUrl";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from 'react-router-dom'

import Home from '../views/Home'

import {useParams } from 'react-router-dom';


const  HistorialNomina = () => {
  let { userDocument } = useParams();
  const [nominas, setNominas] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);  
  const documento = parseInt(userDocument);
  const [currentId, setCurrentId] = useState("");

  const openCloseModalDelete = (id) => {
    setCurrentId(id);
    setModalDelete(!modalDelete)
  }

  

  const getAllNominas = async () => {
    await axios 
    .get(baseUrl + "/" + "Nomina")
    .then( response => {
      setNominas(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const deleteNomina = async () => {
    await axios
    .delete(baseUrl + "/" + "nomina" +  "/" + currentId )
    .catch(error => {
      console.log(error);
    });
  console.log(currentId)
  openCloseModalDelete(!false)
  }


  const filteredNominas = nominas.filter(nomina=>nomina.traDocumento3 === documento)
  // console.log(filteredNominas)
  
  useEffect (() => {
    getAllNominas();
  }, [modalDelete])

  // console.log(documento)

  return (
    <div>
      <Home/>
      <br />
      <Link to="/gestornomina"><button className="btn btn-primary">Volver atras</button></Link>
      <div className="nomina-container">
      <table className='table table-bordered table-light table-hover mt-4'>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Salario estipulado</th>
            <th>Deduccion de salario</th>
            <th>Descuento de salud</th>
            <th>Descuento de Cesantias</th>
            <th>Descuento de parafiscales</th>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
        {filteredNominas.map(nomina => (
          <tr key={nomina.nomid}>
          <td>{nomina.nomid}</td>
          <td>{nomina.nomNombre}</td>
          <td>{nomina.nomApellido}</td>
          <td>{nomina.nomSalarioestipulado}</td>
          <td>{nomina.nomDeduccionsalario}</td>
          <td>{nomina.nomSaludpension}</td>
          <td>{nomina.nomCesantias}</td>
          <td>{nomina.nomParafiscales}</td>
          <td>{nomina.nomInicio}</td>
          <td>{nomina.nomFin}</td>
          <td>
            <button className='btn btn-danger' onClick={() => openCloseModalDelete(nomina.nomid)}>Eliminar</button>
          </td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      <Modal isOpen={modalDelete}>
        <ModalBody>
        ¿Estas seguro de que deseas eliminar esta nomina del trabajador?.
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => deleteNomina()}>Si</button>
          <button className='btn btn-secondary'onClick={() => openCloseModalDelete()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default HistorialNomina;