import './custom.css';
import AppM from './components/AppM';
import { Routes, Route } from 'react-router-dom';
import CrudCurso from './components/curso/Home';
function App() {

    return (
        <>
            <Routes>
            <Route path="/" element={<AppM />} />
            <Route path="/crudCurso" element={<CrudCurso />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* Opcional: una ruta para manejar URLs no existentes */}
            <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
    </>
    );

}

export default App;