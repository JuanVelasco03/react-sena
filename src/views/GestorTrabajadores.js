import { useEffect, useState} from 'react';
import '../App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import '../css/listatrabajadores.css'

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';

import Home from '../views/Home'


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
  // console.log(WorkerSelected)


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
    .post(baseUrl + "/" + "trabajador", WorkerSelected)
    .then(response=>{
      setWorkers(workers.concat(response.data));
      openCloseModal();
    }).catch(error =>{
      console.log(error)
    })
  }


  const putWorker = async() =>{
    await axios
    .put(baseUrl + "/" + "trabajador"+"/"+WorkerSelected.traDocumento, WorkerSelected)
    .catch(error => {
      console.log(error)
    });  
    openCloseModalEdit();
  };

  const deleteWorker = async() => {
   await axios 
   .delete(baseUrl + "/" + "trabajador" + "/" + WorkerSelected.traDocumento)
   .catch(error => {
    console.log(error);
   });
   openCloseModalDelete();
  };

  // console.log(workers);

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
      <Home />
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
              <p className='mb-2'>Ingresa el documento del trabajador</p>
              <input type="text" name="traDocumento"  className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Nombre de trabajador</p>
              <input type="text" name="traNombre" className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Apellido del trabajador</p>
              <input type="text" name="traApellido"  className='w-100 mb-2' onChange={handleChange}></input> 
              <p className='mb-2'>Direccion del trabajador</p>
              <input type="text" name="traDireccion"  className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Numero de celular del trabajador</p>
              <input type="tel" name="traCelular"  className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Ingresa el email del trabajador</p>
              <input type="email" name="traEmail" className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Fecha de nacimiento del trabajador</p>
              <input type="date" name="traFechaNacimiento" className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Codigo de cuenta del trabajador</p>
              <input type="text" name="traCodigocuenta"  className='w-100 mb-2' onChange={handleChange}></input>
              <p className='mb-2'>Edad del trabajador</p>
              <input type="text" name="traEdad" className='w-100 mb-2' onChange={handleChange}></input>
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
              <p className='mb-2'>Ingresa el documento del trabajador</p>
              <input type="text" className='w-100 mb-2' name="traDocumento" disabled onChange={handleChange} value={WorkerSelected &&  WorkerSelected.traDocumento}></input>
              <p className='mb-2'>Nombre de trabajador</p>
              <input type="text" className='w-100 mb-2' name="traNombre" onChange={handleChange} value={WorkerSelected && WorkerSelected.traNombre}></input>
              <p className='mb-2'>Apellido del trabajador</p>
              <input type="text" className='w-100 mb-2' name="traApellido"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traApellido}></input> 
              <p className='mb-2'>Direccion del trabajador</p>
              <input type="text" className='w-100 mb-2' name="traDireccion"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traDireccion}></input>
              <p className='mb-2'>Numero de celular del trabajador</p>
              <input type="tel" className='w-100 mb-2' name="traCelular"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traCelular}></input>
              <p className='mb-2'>Ingresa el email del trabajador</p>
              <input type="email" className='w-100 mb-2' name="traEmail" onChange={handleChange} value={WorkerSelected && WorkerSelected.traEmail}></input>
              <p className='mb-2'>Fecha de nacimiento del trabajador</p>
              <input type="date" className='w-100 mb-2' name="traFechaNacimiento" onChange={handleChange} value={WorkerSelected && WorkerSelected.traFechaNacimiento.substring(0, 10)}></input>
              <p className='mb-2'>Codigo de cuenta del trabajador</p>
              <input type="text" className='w-100 mb-2' name="traCodigocuenta"  onChange={handleChange} value={WorkerSelected && WorkerSelected.traCodigocuenta}></input>
              <p className='mb-2'>Edad del trabajador</p>
              <input type="text" className='w-100 mb-2' name="traEdad" onChange={handleChange} value={WorkerSelected && WorkerSelected.traEdad}></input>
            </div>
            <ModalFooter>
              <button className='btn btn-primary' onClick={() => putWorker()}>Editar trabajador</button>
              <button className='btn btn-danger'onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
        ¿Estas seguro de que deseas eliminar al trabajador <b>{WorkerSelected && WorkerSelected.traNombre}</b> de la base de datos? 
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
