function VistaPrevia({ datos, academico, experiencia, anterior }) {
  const campo = (etiqueta, valor) => (
    <p><strong>{etiqueta}:</strong> {valor || "No registrado"}</p>
  );

  return (
    <div className="formulario vista-previa">
      <h2>Vista Previa de la Hoja de Vida</h2>

      <div className="hoja-vida">
        <div className="hv-encabezado">
          <div className="hv-foto">
            {datos.foto ? (
              <img src={datos.foto} alt="Fotografía de perfil" />
            ) : (
              <div className="hv-foto-vacia">Sin foto</div>
            )}
          </div>

          <div className="hv-identidad">
            <h1>{datos.nombre || "Nombre completo"}</h1>
            <p>{datos.programa || "Programa de formación"}</p>
            <div className="hv-contacto">
              <span>{datos.correo || "Correo no registrado"}</span>
              <span>{datos.ciudad || "Ciudad no registrada"}</span>
              <span>Edad: {datos.edad || "No registrada"}</span>
            </div>
          </div>
        </div>

        <div className="hv-cuerpo">
          <section className="hv-seccion">
            <h3>Perfil académico 🎓 </h3>
            {campo("Nivel de formación", academico.nivel)}
            {campo("Título obtenido", academico.titulo)}
            {campo("Institución educativa", academico.institucion)}
            {campo("Año de graduación", academico.graduacion)}
            {Array.isArray(academico.cursos) && academico.cursos.length > 0 ? (
              <div className="hv-cursos">
                <p><strong>Cursos realizados:</strong></p>
                <ul>
                  {academico.cursos.map((curso, indice) => (
                    <li key={indice}>{curso}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p><strong>Cursos realizados:</strong> No registrados</p>
            )}
          </section>

          <section className="hv-seccion">
            <h3>Experiencia laboral 💼 </h3>
            {experiencia.length > 0 ? (
              experiencia.map((item, indice) => (
                <div className="hv-experiencia" key={indice}>
                  <p><strong>Empresa:</strong> {item.empresa || "No registrado"}</p>
                  <p><strong>Cargo:</strong> {item.cargo || "No registrado"}</p>
                  <p><strong>Tiempo de experiencia:</strong> {item.tiempo || "No registrado"}</p>
                  <p><strong>Funciones desempeñadas:</strong> {item.funciones || "No registrado"}</p>
                  <p><strong>Habilidades técnicas:</strong> {item.habilidades || "No registrado"}</p>
                </div>
              ))
            ) : (
              <p>No hay experiencias registradas.</p>
            )}
          </section>

          <section className="hv-seccion">
            <h3>Información del programa 📚 </h3>
            {campo("Programa", datos.programa)}
            {campo("Número de ficha", datos.ficha)}
            {campo("Jornada", datos.jornada)}
          </section>
        </div>
      </div>

      <button type="button" onClick={anterior}>Anterior</button>
    </div>
  );
}

export default VistaPrevia;
