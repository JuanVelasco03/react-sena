// import { Route, Routes, Navigate} from "react-router-dom";
// import React from "react";
// import Cookies from "universal-cookie";
// import GestorTrabajadores from "../views/GestorTrabajadores";


// // const PrivateRoute = ({element, ...rest}) => {
// //   const cookies = new Cookies ()
// //   const history = useNavigate()

// //   const idrol = parseInt(cookies.get("idrol"))


// //   return (
// //     <Routes>
// //       <Route {...rest}>{idrol === 2 ? history('/login') : <element/> }</Route>
// //     </Routes>

// //   );
// // }

// const PrivateRoute = ({children, ...propiedades}) => {
//     const cookies = new Cookies ()
//     const idrol = parseInt(cookies.get("idrol"))

//     if (idrol === 2) {
//       return <Route {...propiedades}>{children}</Route>
//     } else {
//       // return  <Navigate to="/login" replace />
//     console.log(idrol)

//     }
// }

// export default PrivateRoute;