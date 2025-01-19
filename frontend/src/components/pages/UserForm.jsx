import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import InputFormField from '../shared/inputForm';

function UserForm() {
  const [showLogin, setShowLogin] = useState(true);
  const [errorMessageEmailExistant, setErrorMessageEmailExistant] = useState('');
  const [errorMessageEmailIncorrect, setErrorMessageEmailIncorrect] = useState('');
  const [errorMessageMDPIncorrect, setErrorMessageMDPIncorrect] = useState('');

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [email, setEmail] = useState('');

  const [motDePasseConnexion, setMotDePasseConnexion] = useState('');
  const [emailConnexion, setEmailConnexion] = useState('');

  const loginRef = useRef(null);
  const registerRef = useRef(null);


  useEffect(() => {
    if (showLogin) {
      gsap.to(registerRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(registerRef.current, { visibility: 'hidden' });
          gsap.set(loginRef.current, { visibility: 'visible' });
          gsap.to(loginRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    } else {
      gsap.to(loginRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(loginRef.current, { visibility: 'hidden' });
          gsap.set(registerRef.current, { visibility: 'visible' });
          gsap.to(registerRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    }
  }, [showLogin]);

  const submitConexionForm = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const formDataCreation = {
      emailConnexion,
      motDePasseConnexion,
    };
    const response = await fetch('http://127.0.0.1:3000/connexion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Spécifie que les données sont en JSON
      },
      body: JSON.stringify(formDataCreation), // Envoie les données sous forme de JSON
    });
    const result = await response.json();
    if (result.messageEmail !== '') {
      setErrorMessageEmailIncorrect(result.messageEmail);
    }
  
    if (result.messageMDP !== '') {
      setErrorMessageMDPIncorrect(result.messageMDP);
    }
  }
  const submitCreationForm = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const formDataCreation = {
      prenom,
      nom,
      email,
      motDePasse
    };
    const response = await fetch('http://127.0.0.1:3000/creationCompte', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Spécifie que les données sont en JSON
      },
      body: JSON.stringify(formDataCreation), // Envoie les données sous forme de JSON
    });
    const result = await response.json();
    setErrorMessageEmailExistant(result.message)
    // Gère la réponse de l'API, par exemple afficher un message de succès
  }
  const onChangeInputEmailInscription = (value)=>{
    setErrorMessageEmailExistant('')
    setEmail(value)
  }
  const onChangeInputEmailConnexion = (value)=>{
    setErrorMessageEmailIncorrect('')
    setEmailConnexion(value)
  }
  const onChangeInputMDPConnexion = (value)=>{
    setErrorMessageMDPIncorrect('')
    setMotDePasseConnexion(value)
  }
  
  return (
    <div className="bg-custom-light w-full flex items-center justify-center h-[75vh]">
      <div className="bg-white flex items-center rounded-3xl border-2 shadow-lg max-md:w-3/4 w-1/2 max-md:h-3/5 h-3/4">
        <div ref={loginRef} className={`max-xl:rounded-3xl  rounded-l-3xl bg-white w-full xl:w-1/2 flex flex-col gap-8 justify-center ${!showLogin ? 'hidden' : ''}`}>
          <h2 className="text-center max-sm:text-2xl text-4xl text-gray-600 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-800 from-emerald-500">
            Connectez-vous !
          </h2>
          <form className="w-full max-sm:px-6 px-8 gap-7 flex flex-col items-center" id="loginForm" onSubmit={submitConexionForm}>
            <InputFormField
              type="email"
              name="floating_email"
              id="floating_email"
              label="Adresse email"
              value={emailConnexion}
              onChange={(e) => onChangeInputEmailConnexion(e.target.value)}
              margin='5'
              errorMessage={errorMessageEmailIncorrect}

            />
            <InputFormField
              type="password"
              name="floating_password"
              id="floating_password"
              label="Mot de passe"
              value={motDePasseConnexion}
              onChange={(e) => onChangeInputMDPConnexion(e.target.value)}
              margin='5'
              errorMessage={errorMessageMDPIncorrect}

            />
            <a href="#" onClick={() => setShowLogin(false)} className="text-emerald-600 underline underline-offset-4 font-semibold text-start hover:text-emerald-800">
              Pas de compte ? Cliquez ici pour vous inscrire !
            </a>
            <a href="#" onClick={() => setShowLogin(false)} className="text-emerald-600 underline underline-offset-4 font-semibold text-start hover:text-emerald-800">
              Mot de passe oublié ?
            </a>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
            >
              Connexion
            </button>
          </form>
        </div>

        <div ref={registerRef} className={`rounded-l-3xl gap-8 bg-white w-1/2 flex flex-col justify-center ${showLogin ? 'hidden' : ''}`}>
          <h2 className="text-center text-4xl text-gray-600 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-800 from-emerald-500">
            Inscrivez-vous !
          </h2>
          <form className="w-full px-8 gap-7 flex flex-col items-center" id="registerForm" onSubmit={submitCreationForm}>
            <InputFormField
              type="text"
              name="floating_prenom"
              id="floating_prenom"
              label="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <InputFormField
              type="text"
              name="floating_nom"
              id="floating_nom"
              label="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <InputFormField
              type="email"
              name="floating_email_inscription"
              id="floating_email_inscription"
              label="Email"
              value={email}
              onChange={(e) => onChangeInputEmailInscription(e.target.value)}
              errorMessage={errorMessageEmailExistant}
            />
                        
              <InputFormField
              type="password"
              name="floating_password_inscription"
              id="floating_password_inscription"
              label="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
            <a href="#" onClick={() => setShowLogin(true)} className="text-emerald-600 underline underline-offset-4 font-semibold text-start hover:text-emerald-800">
              Déjà inscrit ? Connectez-vous !
            </a>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
            >
              Inscription
            </button>
          </form>
        </div>
        <img src="images/imgForm.jpeg" alt="" className="w-1/2 rounded-r-3xl h-full max-xl:hidden" />
      </div>
    </div>
  );
}

export default UserForm;
