import {Routes, Route} from 'react-router-dom';
import './App.css';
import Ajout from './Components/Ajout';
import Home from './Components/Accueil';
import Detail from './Components/Accueil/detail';
import Update from './Components/Mise_à_jour';


function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/ajout" element={<Ajout />} />
      <Route path="/detail/:idArticle" element={<Detail />} />
      <Route path="/update/:idArticle" element={<Update />} />
    </Routes>
  );
}

export default App;
