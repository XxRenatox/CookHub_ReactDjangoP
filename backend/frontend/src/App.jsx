import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'; 
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard';
import Subscriptions from './pages/subs/Subs';
import Faq from './pages/faq/FAQ';
import CategoriePage from './pages/categories/CategoriesPage';
import NotFound from './pages/errorPage';

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path='/Registro' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/Subs" element={<Subscriptions />} />
        <Route path="/Faq" element={<Faq />} />    
        <Route path='/category/:categoryName'element={<CategoriePage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;