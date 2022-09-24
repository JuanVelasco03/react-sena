import { useEffect, useState} from 'react';
import '../App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import '../css/listatrabajadores.css'

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import axios from 'axios';

import { baseUrl } from '../ApiRest/baseUrl';

import Home from '../views/Home'



const GestorUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [userSelected, setUserSelected] = useState({
    traDocumento2 : "",
    idrol: "",
    usernombre : "",
    userapellido: "",
    useremail : "",
    userclave: ""
  })
  const [modalEdit, setModalEdit] = useState (false)
  const [modalDelete, setModalDelete] = useState (false)

  const getUser = async() => {
    await axios
    .get(baseUrl + "/" + "usuario")
    .then(response => {
      setUsers(response.data)
    }).catch(error => {
      console.log(error);
    })
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setUserSelected({...userSelected, [name]: value})
  }
  // console.log(userSelected)

  const postWorker = async() => {
    await axios
    .post(baseUrl + "/" + "usuario", userSelected)
    .then(response => {
      setUsers(users.concat(response.data))
      openCloseModalInsert()
    }).catch(error => {
      console.log(error);
    })
  }


  const putUser = async() => {
    await axios
    .put(baseUrl + "/" + "usuario" + "/" + userSelected.userid, userSelected)
    .catch(error => {
      console.log(error);
    })
    openCloseModalEdit();
  }

  const deleteUser = async() => {
    await axios
    .delete(baseUrl + "/" + "usuario" + "/" + userSelected.userid)
    .catch(error => {
      console.log(error);
    })
    openCloseModalDelete();
  }

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert)
  }

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit)
  }

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete)
  }

  const selectUser = (user, caso) => {
    setUserSelected(user);
    (caso === "Editar") ? openCloseModalEdit() : openCloseModalDelete();
  }
  useEffect (() => {
    // if(!cookies.get("id") || cookies.get("idrol") === "2"){
    //   history('/')
    // };
    
    getUser();
  }, [modalInsert, modalEdit, modalDelete])

  // console.log(users);
  return (
    <div>
      <Home />
      <br />
      <button className="btn btn-success" onClick={openCloseModalInsert}>Agregar nuevo usuario</button>
      <div className='table-users'>
      <table className="table table-bordered table-light table-hover mt-4 ">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Tipo de rol</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo electronico</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map (user => (
            <tr key={user.userid}>
              <td>{user.traDocumento2}</td>
              <td>{user.idrol === 1 ? "administrador" : "trabajador" }</td>
              <td>{user.usernombre}</td>
              <td>{user.userapellido}</td>
              <td>{user.useremail}</td>
              <td>{user.userclave}</td>
              <td>
                <button className='btn btn-primary' onClick={() => selectUser(user, "Editar")}>Editar</button>
                <button className='btn btn-danger' onClick={() => selectUser(user, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Modal isOpen={modalInsert}>
        <ModalHeader>Agregar nuevo usuario</ModalHeader>
        <ModalBody>
        <h2>Ingrese un nuevo usuario</h2>
        <p className='mb-2'>Documento del trabajador</p>
        <input type="number" name="traDocumento2" className="input w-100 mb-2"   onChange={handleChange} />
        <p className='mb-2'>Tipo de usuairo (rol)</p>
        <input type="number" name="idrol" className="input w-100 mb-2"  placeholder="1: administrador 2:trabajador"  onChange={handleChange} />
        <p className='mb-2'>Nombre del trabajador</p>
        <input type="text" name="usernombre" className="input w-100 mb-2"    onChange={handleChange} />
        <p className='mb-2'>Apellido del trabajador</p>
        <input type="text" name="userapellido" className="input w-100 mb-2"   onChange={handleChange} />  
        <p className='mb-2'>Ingrese el correo electronico</p> 
        <input type="email" name='useremail' className="input w-100 mb-2" onChange={handleChange} />
        <p className='mb-2'>Ingrese la contraseña (La contraseña debe tener 10 caracteres o mas.)</p>
        <input type="password" name="userclave" className="input w-100 mb-2" onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
        <button className='btn btn-primary' onClick={postWorker}>Agregar nuevo trabajador</button>
        <button className='btn btn-danger'onClick={() => openCloseModalInsert()}>Cancelar</button>
        </ModalFooter>
      </ Modal>
      <Modal isOpen={modalEdit}>
        <ModalHeader>Editar usuario</ModalHeader>
        <ModalBody>
        <h2>Ingrese un nuevo usuario</h2>
        <p className='mb-2'>Documento del trabajador</p>
        <input type="number" name="traDocumento2" className="input w-100 mb-2"  onChange={handleChange} value={userSelected && userSelected.traDocumento2} />
        <p className='mb-2'>Tipo de usuairo (rol)</p>
        <input type="number" name="idrol" className="input w-100 mb-2"  placeholder="1: administrador 2:trabajador"  onChange={handleChange} value={userSelected && userSelected.idrol} />
        <p className='mb-2'>Nombre del trabajador</p>
        <input type="text" name="usernombre" className="input w-100 mb-2"    onChange={handleChange} value={userSelected && userSelected.usernombre} />
        <p className='mb-2'>Apellido del trabajador</p>
        <input type="text" name="userapellido" className="input w-100 mb-2"   onChange={handleChange} value={userSelected && userSelected.userapellido} />  
        <p className='mb-2'>Ingrese el correo electronico</p> 
        <input type="email" name='useremail' className="input w-100 mb-2" onChange={handleChange} value={userSelected && userSelected.useremail} />
        <p className='mb-2'>Ingrese la contraseña (La contraseña debe tener 10 caracteres o mas.)</p>
        <input type="password" name="userclave" className="input w-100 mb-2" onChange={handleChange} value={userSelected && userSelected.userclave} />
        </ModalBody>
        <ModalFooter>
        <button className='btn btn-primary' onClick={() => putUser()}>Actualizar datos trabajador</button>
        <button className='btn btn-danger' onClick={() => openCloseModalEdit()}>Cancelar</button>
        </ModalFooter>
      </ Modal>
      <Modal isOpen={modalDelete}>
        <ModalBody>
            ¿Estas seguro de que deseas eliminar al ususario {selectUser.usernombre}?
        </ModalBody>
        <ModalFooter>
        <button className='btn btn-danger' onClick={() => deleteUser()}>Si</button>
        <button className='btn btn-secondary' onClick={() => openCloseModalDelete()}>No</button>
        </ModalFooter>
      </ Modal>

    </div>
  );
}

export default GestorUsuarios;