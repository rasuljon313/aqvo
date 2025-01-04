import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import HeaderP from '../pages/Header';
import Categoriess from '../pages/Categoriess';
import Employ from '../pages/Employ';
import Product from '../pages/Product';
import Shop from '../pages/shop';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<HeaderP />} />
        <Route path="/categories" element={<Categoriess />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/employees" element={<Employ />} />
        <Route path="/ready-product" element={<Product />} /> 
      </Routes>
    </>
  );
};

export default App;
