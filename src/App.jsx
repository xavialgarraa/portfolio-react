import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { AxProd } from "./pages/AxProd"; 
import { NotFound } from "./pages/NotFound";
import { LanguageProvider } from "./context/LanguageContext";
import { LaResacaDeportiva } from "./pages/LaResacaDeportiva";


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/portfolio-react">
        <Routes>
          {/* Pàgina principal */}
          <Route path="/" element={<Home />} />

          {/* Ruta per AxProd */}
          <Route path="/axprod" element={<AxProd />} />
          <Route path="/axprod/laresacadeportiva" element={<LaResacaDeportiva />} />
          {/* Ruta per 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>

  );
}

export default App;
