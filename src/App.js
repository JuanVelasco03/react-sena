import React from 'react';
import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom'


import Principal from './views/Principal';
import DatosPersonales from './views/DatosPersonales';
import Nomina from './views/Nomina';
import Vacaciones from './views/Vacaciones';
import Asistencia from './views/Asistencia';
import Login from './views/Login';
import GestorTrabajadores from './views/GestorTrabajadores';
import GestorNomina from './views/GestorNomina';
import GestorAsistencia from './views/GestorAsistencia';
import GestorVacaciones from './views/GestorVacaciones';
import GestorUsuarios from './views/GestorUsuarios';
import HistorialNomina from './views/HistorialNomina';
import HistorialHorario from './views/HistorialHorario';
import HistorialVacacion from './views/HistorialVacacione';
import Home2 from './views/Home2';
import ForgetPassword from './views/ForgetPassword';
import ChangePass from './views/ChangePass';

import Cookies from "universal-cookie";




function App() {
  const cookies = new Cookies();
  const idrol = parseInt(cookies.get("idrol"))

  // console.log(idrol)
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/principal' element={<Principal />}></Route>
        <Route exact path='/datospersonales' element={<DatosPersonales />}></Route>
        <Route exact path='/Nomina' element={<Nomina />}></Route>
        <Route exact path='/Vacaciones' element={<Vacaciones />}></Route>
        <Route exact path='/Asistencia' element={<Asistencia />}></Route>
        <Route exact path='/home' element={idrol === 2 ? <Navigate to="/Principal" replace/> : <Home2/>} />
        <Route exact path='/gestortrabajadores' element={idrol === 2 ? <Navigate to="/Principal" replace/> : <GestorTrabajadores />} />
        <Route exact path='/gestorusuarios' element={idrol === 2 ? <Navigate to="/Principal" replace/> : <GestorUsuarios />} />
        <Route exact path='/gestornomina' element={idrol === 2 ? <Navigate to="/Principal" replace/> : <GestorNomina />} />
        <Route exact path='/gestorasistencia' element={idrol === 2 ? <Navigate to="/Principal" replace/> : <GestorAsistencia />} />
        <Route exact path='/gestorvacaciones' element={idrol === 2 ? <Navigate to="/Principal" replace/> : <GestorVacaciones />} />
        <Route exact path='/historialnomina:userDocument' element={<HistorialNomina />} />
        <Route exact path='/historialhorario:userDocument' element={<HistorialHorario />} />
        <Route exact path='/historialvacacion:userDocument' element={<HistorialVacacion />} />
        <Route exact path='/forgetpass' element={<ForgetPassword />} />
        <Route exact path='/changePass' element={<ChangePass />} />
      </Routes>
    </div>
  );
}

export default App;
