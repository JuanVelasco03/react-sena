import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { baseUrl } from '../ApiRest/baseUrl';
import Cookies from 'universal-cookie';
import HomeWorker from '../views/HomeWorker';

const DatosPersonales = () => {

  const cookies = new Cookies();
  const documento = cookies.get("traDocumento2");
  const [worker, setWorker] = useState({});

  const getWorker = async() => {
    await axios 
    .get(baseUrl + "/" + "trabajador" + "/" + documento)
    .then(response => { setWorker(response.data.result)});
  }

  useEffect(() => {
    getWorker();
  }, [])

  console.log(worker);
  return (
    <div>
      <HomeWorker />
      <div className='content-data'>
        <h2 className="title">MIS DATOS PERSONALES</h2>
          <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Documento</label>
            <input type="text" value={worker.traDocumento} disabled="disabled" className="form-control" />
          </div>
        </div>
    
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Nombre</label>
            <input type="text" value={worker.traNombre} disabled="disabled" className="form-control" />
          </div>
        </div>    
    
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Apellido</label>
            <input type="text" value={worker.traApellido} disabled="disabled" className="form-control" />
          </div>
        </div>    
    
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'>Direccion</label>
            <input type="text" value={worker.traDireccion} disabled="disabled" className="form-control" />
          </div>
        </div>    
        
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Numero de celular </label>
            <input type="text" value={worker.traCelular} disabled="disabled" className="form-control" />
          </div>
        </div>    
        
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Correo electrónico </label>
            <input type="text" value={worker.traEmail} disabled="disabled" className="form-control" />
          </div>
        </div>    
        
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Fecha de nacimiento </label>
            <input type="text" value={worker.traCelular} disabled="disabled" className="form-control" />
          </div>
        </div>    
        
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Edad</label>
            <input type="text" value={worker.traEdad} disabled="disabled" className="form-control" />
          </div>
        </div>    
        
        <div className="col-md-6">
          <div className="form-group"> 
            <label className='label'> Codigo de cuenta</label>
            <input type="text" value={worker.traCodigocuenta} disabled="disabled" className="form-control" />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default DatosPersonales;