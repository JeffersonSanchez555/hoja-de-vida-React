function VistaPrevia({ datos, academico, experiencia, anterior }) {
  const campo = (etiqueta, valor) => (
    <p><strong>{etiqueta}:</strong> {valor || "No registrado"}</p>
  );

  return (
    <div className="formulario vista-previa">
      <h2>Vista Previa de la Hoja de Vida</h2>
      <div className="preview-seccion">
        <h3>Datos personales</h3>
        {campo("Nombre", datos.nombre)}
        {campo("Edad", datos.edad)}
        {campo("Ciudad", datos.ciudad)}
        {campo("Correo", datos.correo)}
        {campo("Programa", datos.programa)}
        {campo("Ficha", datos.ficha)}
        {campo("Jornada", datos.jornada)}
      </div>
      <div className="preview-seccion">
        <h3>Información académica</h3>
        {campo("Nivel", academico.nivel)}
        {campo("Título", academico.titulo)}
        {campo("Cursos", academico.cursos)}
        {campo("Institución", academico.institucion)}
        {campo("Año de graduación", academico.graduacion)}
      </div>
      <div className="preview-seccion">
        <h3>Experiencia</h3>
        {campo("Empresa", experiencia.empresa)}
        {campo("Tiempo de experiencia", experiencia.experiencia)}
        {campo("Habilidades", experiencia.habilidades)}
        {campo("Cargo", experiencia.cargo)}
        {campo("Funciones", experiencia.funciones)}
      </div>
      <button type="button" onClick={anterior}>Anterior</button>
    </div>
  );
}

export default VistaPrevia;
