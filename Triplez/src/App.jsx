import { useState } from "react";
import Header from "./components/Header.jsx";
import FormularioDatos from "./components/FormularioDatos.jsx";
import Footer from "./components/footer.jsx";
import FormularioAcademico from "./components/FormularioAcademico.jsx";
import FormularioExperiencia from "./components/FormularioExperiencia.jsx";
import VistaPrevia from "./components/VistaPrevia.jsx";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/api";

function App() {
  const [paso, setPaso] = useState(1);
  const [idHv, setIdHv] = useState(null);
  const [cargando, setCargando] = useState(false);

  const [datos, setDatos] = useState({});
  const [academico, setAcademico] = useState({});
  const [experiencia, setExperiencia] = useState([]);
  const [cursos, setCursos] = useState([]);

  const guardarHojaDeVida = async () => {
    setCargando(true);
    try {
      //Datos Personales
      const resHV = await fetch(`${API_URL}/registrohv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const dataHV = await resHV.json();
      if (!resHV.ok) throw new Error(dataHV.mensaje || "Error al guardar datos personales");

      const generatedId = dataHV.id_hojadvida;
      setIdHv(generatedId);

      // 2. Guardar Estudio
      if (academico && Object.keys(academico).length > 0) {
        await fetch(`${API_URL}/hojas-vida/${generatedId}/estudios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(academico),
        });
      }

      // Guardar Cursos 
      if (cursos.length > 0) {
        for (const curso of cursos) {
          const payloadCurso = typeof curso === "string" ? { nombre: curso } : curso;
          await fetch(`${API_URL}/hojas-vida/${generatedId}/cursos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadCurso),
          });
        }
      }

      //  Experiencias y habiliti
      if (experiencia.length > 0) {
        for (const exp of experiencia) {
          // Registrar la experiencia laboral
          const resExp = await fetch(`${API_URL}/hojas-vida/${generatedId}/experiencias`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exp),
          });

          const dataExp = await resExp.json();

          // Registrar habilidades a exp
          if (resExp.ok && exp.habilidades) {
            const expId = dataExp.id_exp;

            // Convierte texto 
            let listaHabilidades = [];
            if (typeof exp.habilidades === "string") {
              listaHabilidades = exp.habilidades.split(",").map((h) => h.trim());
            } else if (Array.isArray(exp.habilidades)) {
              listaHabilidades = exp.habilidades;
            }

            for (const hab of listaHabilidades) {
              if (!hab) continue;

              const payloadHab = typeof hab === "object" ? hab : { nombre: hab };

              await fetch(`${API_URL}/experiencias/${expId}/habilidades`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadHab),
              });
            }
          }
        }
      }

      alert("Hoja de vida guardada con éxito");

      // Reiniciar e
      setPaso(1);
      setDatos({});
      setAcademico({});
      setExperiencia([]);
      setCursos([]);
      setIdHv(null);
    } catch (error) {
      console.error(error);
      alert(error.message || "Ocurrió un error al guardar la hoja de vida");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor">
      <Header />

      {paso === 1 && (
        <FormularioDatos
          datos={datos}
          setDatos={setDatos}
          siguiente={() => setPaso(2)}
        />
      )}

      {paso === 2 && (
        <FormularioAcademico
          datos={academico}
          setDatos={setAcademico}
          cursos={cursos}
          setCursos={setCursos}
          siguiente={() => setPaso(3)}
          anterior={() => setPaso(1)}
        />
      )}

      {paso === 3 && (
        <FormularioExperiencia
          datos={experiencia}
          setDatos={setExperiencia}
          anterior={() => setPaso(2)}
          siguiente={() => setPaso(4)}
        />
      )}

      {paso === 4 && (
        <div>
          <VistaPrevia
            datos={datos}
            academico={academico}
            cursos={cursos}
            experiencia={experiencia}
            anterior={() => setPaso(3)}
          />
          <div className="acciones-finales" style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={() => setPaso(3)} disabled={cargando}>
              Anterior
            </button>
            <button onClick={guardarHojaDeVida} disabled={cargando} style={{ marginLeft: "10px" }}>
              {cargando ? "Guardando..." : "Guardar hoja de vida"}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;