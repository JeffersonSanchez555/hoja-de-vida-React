import { useState } from "react";
import Header from "./components/Header.jsx";
import FormularioDatos from "./components/FormularioDatos.jsx";
import Footer from "./components/footer.jsx";
import FormularioAcademico from "./components/FormularioAcademico.jsx";
import FormularioExperiencia from "./components/FormularioExperiencia.jsx";
import VistaPrevia from "./components/VistaPrevia.jsx";
import "./App.css";

function App() {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({});
  const [academico, setAcademico] = useState({});
  const [experiencia, setExperiencia] = useState([]);

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
        <VistaPrevia
          datos={datos}
          academico={academico}
          experiencia={experiencia}
          anterior={() => setPaso(3)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
