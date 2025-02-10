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
import Dashboard from './components/Test.jsx';
import Profil from './components/pages/Profil.jsx';
import Layout from './components/layout/Layout.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
          <Route path="/produit/:id" element={<ProductPage />} /> {/* Page produit */}
          <Route path="/login" element={<UserForm />} /> {/* Page login */}
          <Route path="/panier" element={<Panier />} /> {/* Page du panier */}
          <Route path="/search" element={<Search />} /> {/* Page du panier */}
          <Route path="/admin" element={<Dashboard />} /> {/* Page du panier */}
          <Route path="/account" element={<Profil />} /> {/* Page du panier */}
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
