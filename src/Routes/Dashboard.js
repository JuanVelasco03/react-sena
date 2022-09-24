import React from 'react';
import {Route, Routes} from 'react-router-dom'



import GestorTrabajadores from '../views/GestorTrabajadores';
import GestorNomina from '../views/GestorNomina';
import GestorAsistencia from '../views/GestorAsistencia';
import GestorVacaciones from '../views/GestorVacaciones';
import GestorUsuarios from '../views/GestorUsuarios';
import HistorialNomina from '../views/HistorialNomina';
import HistorialHorario from '../views/HistorialHorario';
import HistorialVacacion from '../views/HistorialVacacione';

const Dashboard = () => {
  return (
    <>
      <Routes>
      <Route exact path='/gestortrabajadores' element={<GestorTrabajadores />} />
      <Route exact path='/gestornomina' element={<GestorNomina />}></Route>
      <Route exact path='/gestorasistencia' element={<GestorAsistencia />}></Route>
      <Route exact path='/gestorvacaciones' element={<GestorVacaciones />}></Route>
      <Route exact path='/gestorusuarios' element={<GestorUsuarios />}></Route>
      <Route exact path='/historialnomina:userDocument' element={<HistorialNomina />}></Route>
      <Route exact path='/historialhorario:userDocument' element={<HistorialHorario />}></Route>
      <Route exact path='/historialvacacion:userDocument' element={<HistorialVacacion />}></Route>
     </Routes>
    </>
  );
};

export default Dashboard;








      
