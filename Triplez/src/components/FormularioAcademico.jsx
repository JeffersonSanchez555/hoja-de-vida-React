import { useState } from "react";

function FormularioAcademico({ datos, setDatos, cursos, setCursos, siguiente, anterior }) {
  const [nuevoCurso, setNuevoCurso] = useState("");

  const actualizar = (campo, valor) => {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const agregarCurso = () => {
    if (!nuevoCurso.trim()) {
      return;
    }

    
    setCursos((anteriores) => [
      ...(Array.isArray(anteriores) ? anteriores : []),
      { nombre: nuevoCurso.trim() }
    ]);

    setNuevoCurso("");
  };

  const eliminarCurso = (indice) => {
    setCursos((anteriores) =>
      (Array.isArray(anteriores) ? anteriores : []).filter((_, i) => i !== indice)
    );
  };

  const continuar = (e) => {
    e.preventDefault();
    siguiente();
  };

  return (
    <div className="formulario">
      <h2>Información Académica</h2>
      <form onSubmit={continuar}>
        <div className="grupo">
          <label>Nivel de Formación</label>
          <select
            value={datos.nivel || "Técnico"}
            onChange={(e) => actualizar("nivel", e.target.value)}
          >
            <option>Técnico</option>
            <option>Tecnólogo</option>
            <option>Profesional</option>
          </select>
        </div>

        <div className="grupo">
          <label>Título Obtenido</label>
          <input
            type="text"
            placeholder="Ingrese el título"
            value={datos.titulo || ""}
            onChange={(e) => actualizar("titulo", e.target.value)}
            required
          />
        </div>

        <div className="grupo">
          <label>Cursos Realizados</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del curso"
            value={nuevoCurso}
            onChange={(e) => setNuevoCurso(e.target.value)}
          />
          <button type="button" onClick={agregarCurso}>
            + Agregar curso
          </button>
        </div>

        <div className="lista-cursos">
          {(Array.isArray(cursos) ? cursos : []).map((curso, indice) => (
            <div className="curso-item" key={indice}>
              <span>{typeof curso === "object" ? curso.nombre : curso}</span>
              <button type="button" onClick={() => eliminarCurso(indice)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="grupo">
          <label>Institución Educativa</label>
          <input
            type="text"
            placeholder="Ingrese la institución"
            value={datos.institucion || ""}
            onChange={(e) => actualizar("institucion", e.target.value)}
            required
          />
        </div>

        <div className="grupo">
          <label>Año de Graduación</label>
          <input
            type="number"
            placeholder="Ejemplo: 2026"
            value={datos.graduacion || ""}
            onChange={(e) => actualizar("graduacion", e.target.value)}
            required
          />
        </div>

        <button type="button" onClick={anterior}>
          Anterior
        </button>
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
}

export default FormularioAcademico;