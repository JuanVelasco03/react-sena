import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'

import Home from './views/Home'
import Home2 from './componenst/Home2'
import GestorTrabajadores from './views/GestorTrabajadores';
import GestorNomina from './views/GestorNomina';
import GestorAsistencia from './views/GestorAsistencia';
import GestorVacaciones from './views/GestorVacaciones';
import GestorUsuarios from './views/GestorUsuarios';
import HistorialNomina from './views/HistorialNomina';


function App() {
  return (
    <div className="App">
    <Home />
      <Routes>
        <Route path='/' element={<Home2 />}></Route>
        <Route path='/gestortrabajadores' element={<GestorTrabajadores />}></Route>
        <Route path='/gestornomina' element={<GestorNomina />}></Route>
        <Route path='/gestorasistencia' element={<GestorAsistencia/>}></Route>
        <Route path='/gestorvacaciones' element={<GestorVacaciones/>}></Route>
        <Route path='/gestorusuarios' element={<GestorUsuarios />}></Route>
        <Route path='/historialnomina:userDocument' element={<HistorialNomina />}></Route>
      </Routes>
    </div>
  );
}

export default App;
