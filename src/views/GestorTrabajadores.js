import { useEffect, useState} from 'react';
import '../App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import '../css/listatrabajadores.css'

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';


const  GestorTrabajadores = () => {

  const [workers, setWorkers] = useState([]);
  const [WorkerSelected, setWorkerSelected] = useState({
    traDocumento: '',
    traNombre: '',
    traApellido: '',
    traCelular: '',
    traEmail: '',
    traFechaNacimiento: '',
    traCodigocuenta: '',
    traEdad: ''
  })
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  


  const handleChange = (e) => {
    const {name, value}=e.target;
    setWorkerSelected({
      ...WorkerSelected, [name]: value
    })
  }
  console.log(WorkerSelected)


  const openCloseModal = () => {
    setModalInsert(!modalInsert)
  }

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit)
  }

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete)
  }

  const getAllWorkers = async() => {
    await axios
    .get(baseUrl + "/" + "trabajador")
    .then (response => {
      setWorkers(response.data);
    }).catch(error => {
      console.log(error)
    })
  }

  const postWorker = async() => {
    await axios
    .post(baseUrl, WorkerSelected)
    .then(response=>{
      setWorkers(workers.concat(response.data));
      openCloseModal();
    }).catch(error =>{
      console.log(error)
    })
  }


  const putWorker = async() =>{
    await axios
    .put(baseUrl+"/"+WorkerSelected.traDocumento, WorkerSelected)
    .catch(error => {
      console.log(error)
    });  
    openCloseModalEdit();
  };

  const deleteWorker = async() => {
   await axios 
   .delete(baseUrl+"/"+WorkerSelected.traDocumento)
   .catch(error => {
    console.log(error);
   });
   openCloseModalDelete();
  };

  console.log(workers);

  const selectWorker = (worker, caso) =>{
    setWorkerSelected(worker);
    (caso === "Editar") ? openCloseModalEdit() : openCloseModalDelete(); 
  }

  useEffect(() =>{
    getAllWorkers();
  }, [modalInsert, modalEdit, modalDelete]);
  // console.log(workers)

  return (
     <div className="App">
      <br />
      <button className="btn btn-success" onClick={() => openCloseModal()}>Insertar un nuevo trabajador</button>
      <br />
      <div className='main-container'>
      <table className='table table-bordered table-light table-hover mt-4 '>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Fecha de nacimiento</th>
            <th>Direccion</th>
            <th>Edad</th>
            <th>Codigo de cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
           {workers.map(worker => (
            <tr key={worker.id}>
              <td>{worker.traDocumento}</td>
              <td>{worker.traNombre}</td>
              <td>{worker.traApellido}</td>
              <td>{worker.traCelular}</td>
              <td>{worker.traEmail}</td>
              <td>{worker.traFechaNacimiento}</td>
              <td>{worker.traDireccion}</td>
              <td>{worker.traEdad}</td>
              <td>{worker.traCodigocuenta}</td>
              <td>
                <button className='btn btn-primary' onClick={() => selectWorker(worker, "Editar")}>Editar</button>
                <button className='btn btn-danger'onClick={() => selectWorker(worker, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
           ))}
        </tbody>
      </table>
      </div>
      <Modal isOpen={modalInsert}>
        <ModalHeader>Insertar un nuevo Trabajador</ModalHeader>
        <ModalBody>
            <div>
              <h2> Ingresar trabajador</h2>
              <p>Ingresa el documento del trabajador</p>
              <input type="text" name="traDocumento"  onChange={handleChange}></input>
              <p>Nombre de trabajador</p>
              <input type="text" name="traNombre" onChange={handleChange}></input>
              <p>Apellido del trabajador</p>
              <input type="text" name="traApellido"  onChange={handleChange}></input> 
              <p>Direccion del trabajador</p>
              <input type="text" name="traDireccion"  onChange={handleChange}></input>
              <p>Numero de celular del trabajador</p>
              <input type="tel" name="traCelular"  onChange={handleChange}></input>
              <p>Ingresa el email del trabajador</p>
              <input type="email" name="traEmail" onChange={handleChange}></input>
              <p>Fecha de nacimiento del trabajador</p>
              <input type="date" name="traFechaNacimiento" onChange={handleChange}></input>
              <p>Codigo de cuenta del trabajador</p>
              <input type="text" name="traCodigocuenta"  onChange={handleChange}></input>
              <p>Edad del trabajador</p>
              <input type="text" name="traEdad" onChange={handleChange}></input>
            </div>
            <ModalFooter>
              <button className='btn btn-primary' onClick={() => postWorker()}>Agregar nuevo trabajador</button>
              <button className='btn btn-danger'onClick={() => openCloseModal()}>Cancelar</button>
            </ModalFooter>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Editar Trabajador</ModalHeader>
        <ModalBody>
            <div>
              <h2> Editar trabajador</h2>
              <p>Ingresa el documento del trabajador</p>
              <input type="text" name="traDocumento" disabled onChange={handleChange} value={WorkerSelected &&  WorkerSelected.traDocumento}></input>
              <p>Nombre de trabajador</p>
              <input type="text" name="traNombre" onChange={handleChange} value={WorkerSelected && WorkerSelected.traNombre}></input>
              <p>Apellido del trabajador</p>
              <input type="text" name="traApellido"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traApellido}></input> 
              <p>Direccion del trabajador</p>
              <input type="text" name="traDireccion"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traDireccion}></input>
              <p>Numero de celular del trabajador</p>
              <input type="tel" name="traCelular"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traCelular}></input>
              <p>Ingresa el email del trabajador</p>
              <input type="email" name="traEmail" onChange={handleChange} value={WorkerSelected && WorkerSelected.traEmail}></input>
              <p>Fecha de nacimiento del trabajador</p>
              <input type="date" name="traFechaNacimiento" onChange={handleChange} value={WorkerSelected && WorkerSelected.traFechaNacimiento.substring(0, 10)}></input>
              <p>Codigo de cuenta del trabajador</p>
              <input type="text" name="traCodigocuenta"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traCodigocuenta}></input>
              <p>Edad del trabajador</p>
              <input type="text" name="traEdad" onChange={handleChange} value={WorkerSelected && WorkerSelected.traEdad}></input>
            </div>
            <ModalFooter>
              <button className='btn btn-primary' onClick={() => putWorker()}>Editar trabajador</button>
              <button className='btn btn-danger'onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
        ¿Estas seguro de que deseas eliminar al trabajador <b>{WorkerSelected && WorkerSelected.traNombre}</b> el trabajador de la base de datos? 
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => deleteWorker()}>Si</button>
          <button className='btn btn-secondary'onClick={() => openCloseModalDelete()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GestorTrabajadores;
