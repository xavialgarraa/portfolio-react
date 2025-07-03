import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { AxProd } from "./pages/AxProd"; 
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter basename="/portfolio-react">
      <Routes>
        {/* Pàgina principal */}
        <Route path="/" element={<Home />} />

        {/* Ruta per AxProd */}
        <Route path="/axprod" element={<AxProd />} />

        {/* Ruta per 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
