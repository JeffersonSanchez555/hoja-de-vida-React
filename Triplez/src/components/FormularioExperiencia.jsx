import { useState } from "react";

function FormularioExperiencia({ datos, setDatos, anterior, siguiente }) {

  const [nuevaExperiencia, setNuevaExperiencia] = useState({
    empresa: "",
    cargo: "",
    tiempo: "",
    funciones: "",
    habilidades: "",
  });

  const actualizar = (campo, valor) => {
    setNuevaExperiencia((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  };

  const agregarExperiencia = () => {
    
    if (!nuevaExperiencia.empresa.trim()) {
      return;
    }

    setDatos((anterior) => [...anterior, nuevaExperiencia]);

    setNuevaExperiencia({
      empresa: "",
      cargo: "",
      tiempo: "",
      funciones: "",
      habilidades: "",
    });
  };

  const eliminarExperiencia = (indice) => {
    setDatos((anterior) => anterior.filter((_, i) => i !== indice));
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
          <input
            type="text"
            placeholder="Ingrese la empresa"
            value={nuevaExperiencia.empresa}
            onChange={(e) => actualizar("empresa", e.target.value)}
          />
        </div>

        <div className="grupo">
          <label>Tiempo de Experiencia</label>
          <input
            type="text"
            placeholder="Ejemplo: 1 año"
            value={nuevaExperiencia.tiempo}
            onChange={(e) => actualizar("tiempo", e.target.value)}
          />
        </div>

        <div className="grupo">
          <label>Habilidades Técnicas</label>
          <input
            type="text"
            placeholder="Ejemplo: HTML, CSS, JavaScript, React..."
            value={nuevaExperiencia.habilidades}
            onChange={(e) => actualizar("habilidades", e.target.value)}
          />
        </div>

        <div className="grupo">
          <label>Cargo</label>
          <input
            type="text"
            placeholder="Ingrese el cargo"
            value={nuevaExperiencia.cargo}
            onChange={(e) => actualizar("cargo", e.target.value)}
          />
        </div>

        <div className="grupo">
          <label>Funciones Desempeñadas</label>
          <input
            type="text"
            placeholder="Escriba las funciones"
            value={nuevaExperiencia.funciones}
            onChange={(e) => actualizar("funciones", e.target.value)}
          />
        </div>

        <div className="grupo acciones-experiencia">
          <button type="button" onClick={agregarExperiencia}>
            + Agregar experiencia
          </button>
        </div>

        <div className="lista-experiencias">
          {datos.map((experiencia, indice) => (
            <div className="experiencia-item" key={indice}>
              <div>
                <strong>{experiencia.empresa}</strong>
                <p><strong>Cargo:</strong> {experiencia.cargo || "No registrado"}</p>
                <p><strong>Tiempo:</strong> {experiencia.tiempo || "No registrado"}</p>
                <p><strong>Funciones:</strong> {experiencia.funciones || "No registrado"}</p>
                <p><strong>Habilidades:</strong> {experiencia.habilidades || "No registrado"}</p>
              </div>
              <button type="button" onClick={() => eliminarExperiencia(indice)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={anterior}>Anterior</button>
        <button type="submit">Vista Previa</button>
      </form>
    </div>
  );
}

export default FormularioExperiencia;
