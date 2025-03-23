// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import de Provider
import store from './store';  // Import du store par défaut
import './index.css';
import HomePage from './components/pages/HomePage.jsx';
import UserForm from './components/pages/UserForm.jsx';
import Header from './components/layout/header.jsx';
import Footer from './components/layout/Footer.jsx';
import Panier from './components/pages/Panier.jsx';
import ProductPage from './components/pages/ProductPage.jsx';
import Search from './components/pages/Search.jsx';
import Dashboard from './components/Test.jsx';
import Profil from './components/pages/Profil.jsx';
import Layout from './components/layout/Layout.jsx';
import PanierTest from './components/Test.jsx'; 
import ScrollToTop from './components/layout/ScrollToTop.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Enveloppe ton application avec Provider et passe le store */}
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
            <Route path="/produit/:id" element={<ProductPage />} /> {/* Page produit */}
            <Route path="/login" element={<UserForm />} /> {/* Page login */}
            <Route path="/panier" element={<Panier />} /> {/* Page du panier */}
            <Route path="/search" element={<Search />} /> {/* Page recherche */}
            <Route path="/admin" element={<Dashboard />} /> {/* Page admin */}
            <Route path="/account" element={<Profil />} /> {/* Page profil */}
            <Route path="/test" element={<PanierTest />} /> {/* Page profil */}
          </Route>
        </Routes>
      </Router>
    </Provider> {/* Fin du Provider */}
  </StrictMode>
);
