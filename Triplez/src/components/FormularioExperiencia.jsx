function FormularioExperiencia({ datos, setDatos, anterior, siguiente }) {
  const actualizar = (campo, valor) => {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const continuar = (e) => {
    e.preventDefault();
    siguiente();
  };

  return (
    <div className="formulario">
      <h2>Experiencia</h2>
      <form onSubmit={continuar}>
        <div className="grupo">
          <label>Empresa</label>
          <input type="text" placeholder="Ingrese la empresa" value={datos.empresa || ""} onChange={(e) => actualizar("empresa", e.target.value)} />
        </div>
        <div className="grupo">
          <label>Tiempo de Experiencia</label>
          <input type="text" placeholder="Ejemplo: 1 año" value={datos.experiencia || ""} onChange={(e) => actualizar("experiencia", e.target.value)} />
        </div>
        <div className="grupo">
          <label>Habilidades Técnicas</label>
          <input type="text" placeholder="Ejemplo: HTML, CSS, JavaScript, React..." value={datos.habilidades || ""} onChange={(e) => actualizar("habilidades", e.target.value)} />
        </div>
        <div className="grupo">
          <label>Cargo</label>
          <input type="text" placeholder="Ingrese el cargo" value={datos.cargo || ""} onChange={(e) => actualizar("cargo", e.target.value)} />
        </div>
        <div className="grupo">
          <label>Funciones Desempeñadas</label>
          <input type="text" placeholder="Escriba las funciones" value={datos.funciones || ""} onChange={(e) => actualizar("funciones", e.target.value)} />
        </div>
        <button type="button" onClick={anterior}>Anterior</button>
        <button type="submit">Vista Previa</button>
      </form>
    </div>
  );
}

export default FormularioExperiencia;
