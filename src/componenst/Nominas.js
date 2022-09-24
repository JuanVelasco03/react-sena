const Nominas = (props) => {
  if(props.dataFilter<= 0){
    return <p>No tienes nominas todavia</p>
  }else{
    return <table className="table table-bordered table-light table-hover mt-4">
    <thead>
      <tr>
        <th>Documento</th>
        <th>Nombre</th>
        <th>apellido</th>
        <th>Salario</th>
        <th>Salud y pension</th>
        <th>Cesantias</th>
        <th>Parafiscales</th>
        <th>Fecha de inicio</th>
        <th>Fecha de fin</th>
      </tr>
    </thead>
    <tbody>
      {props.dataFilter.map(nomina => (
        <tr key={nomina.nomid}>
          <td>{nomina.traDocumento3}</td>
          <td>{nomina.nomNombre}</td>
          <td>{nomina.nomApellido}</td>
          <td>{nomina.nomSalarioestipulado}</td>
          <td>{nomina.nomDeduccionsalario}</td>
          <td>{nomina.nomCesantias}</td>
          <td>{nomina.nomParafiscales}</td>
          <td>{nomina.nomInicio}</td>
          <td>{nomina.nomFin}</td>
        </tr>
      ))}
    </tbody>
  </table>
  }
}

export default Nominas;