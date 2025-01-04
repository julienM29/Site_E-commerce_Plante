import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'
import HomePage from './components/pages/HomePage.jsx';
import UserForm from './components/pages/UserForm.jsx';
import Header from './components/layout/header.jsx'
import Footer from './components/layout/Footer.jsx' 
import Panier from './components/pages/Panier.jsx';
import ProductPage from './components/pages/ProductPage.jsx';
import Search from './components/pages/Search.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
        <Route path="/produit/:id" element={<ProductPage />} /> {/* Page produit */}
        <Route path="/login" element={<UserForm />} /> {/* Page login */}
        <Route path="/panier" element={<Panier />} /> {/* Page du panier */}
        <Route path="/collections/plantes" element={<Search />} /> {/* Page du panier */}
      </Routes>
    </Router>  
    <Footer />
  </StrictMode>,
)
