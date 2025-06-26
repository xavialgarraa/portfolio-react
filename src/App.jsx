import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
        {/*
        <header style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #ccc' }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: '120px', height: 'auto' }}
          />
        </header>
         */}
        <Routes>
          <Route path="*" element={<Home />} />
          {/* {<Route path="*" element = {<NotFound />}/>} */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
