import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'
import HomePage from './components/HomePage.jsx';
import Test from './components/Test.jsx';
import Test2 from './components/Test2.jsx';
import UserForm from './components/UserForm.jsx';
import Header from './components/header.jsx'
import Footer from './components/Footer.jsx' 
import Panier from './components/Panier.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
        <Route path="/produit/:id" element={<Test />} /> {/* Page produit */}
        <Route path="/produit2/:id" element={<Test2 />} /> {/* Page produit */}
        <Route path="/login" element={<UserForm />} /> {/* Page login */}
        <Route path="/panier" element={<Panier />} /> {/* Page du panier */}
      </Routes>
    </Router>  
    <Footer />
  </StrictMode>,
)
