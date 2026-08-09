function FormularioDatos({ datos, setDatos, siguiente }) {
  const actualizar = (campo, valor) => {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const continuar = (e) => {
    e.preventDefault();
    siguiente();
  };

  return (
    <div className="formulario">
      <h2>Registro de Aprendices</h2>
      <form onSubmit={continuar}>
        <div className="grupo">
          <label>Fotografía</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => actualizar("foto", e.target.files?.[0]?.name || "")}
          />
        </div>
        <div className="grupo">
          <label>Nombre Completo</label>
          <input type="text" placeholder="Ingrese su nombre" value={datos.nombre || ""} onChange={(e) => actualizar("nombre", e.target.value)} required />
        </div>
        <div className="grupo">
          <label>Edad</label>
          <input type="number" placeholder="Ingrese su edad" value={datos.edad || ""} onChange={(e) => actualizar("edad", e.target.value)} required />
        </div>
        <div className="grupo">
          <label>Ciudad</label>
          <input type="text" placeholder="Ingrese su ciudad" value={datos.ciudad || ""} onChange={(e) => actualizar("ciudad", e.target.value)} required />
        </div>
        <div className="grupo">
          <label>Programa de formación</label>
          <input type="text" placeholder="Ejemplo: ADSO" value={datos.programa || ""} onChange={(e) => actualizar("programa", e.target.value)} required />
        </div>
        <div className="grupo">
          <label>Correo Electrónico</label>
          <input type="email" placeholder="correo@sena.edu.co" value={datos.correo || ""} onChange={(e) => actualizar("correo", e.target.value)} required />
        </div>
        <div className="grupo">
          <label>Número de Ficha</label>
          <input type="number" placeholder="Ingrese la ficha" value={datos.ficha || ""} onChange={(e) => actualizar("ficha", e.target.value)} required />
        </div>
        <div className="grupo">
          <label>Jornada</label>
          <select value={datos.jornada || "Mañana"} onChange={(e) => actualizar("jornada", e.target.value)}>
            <option>Mañana</option>
            <option>Tarde</option>
            <option>Noche</option>
            <option>Mixta</option>
          </select>
        </div>
        <button type="submit">Continuar Registro</button>
      </form>
    </div>
  );
}

export default FormularioDatos;
