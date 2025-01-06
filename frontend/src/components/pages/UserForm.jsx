import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { imgForm } from '../../assets/images';

function UserForm() {
  const [showLogin, setShowLogin] = useState(true);
  const loginRef = useRef(null);
  const registerRef = useRef(null);

  useEffect(() => {
    if (showLogin) {
      gsap.to(registerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(registerRef.current, { display: 'none' });
          gsap.set(loginRef.current, { display: 'block' });
          gsap.to(loginRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    } else {
      gsap.to(loginRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(loginRef.current, { display: 'none' });
          gsap.set(registerRef.current, { display: 'block' });
          gsap.to(registerRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    }
  }, [showLogin]);

  return (
    <div className="bg-custom-light w-full flex items-center justify-center min-h-[75vh]">
      <div className="bg-white flex items-center rounded-3xl border-2 shadow-lg w-1/2 h-2/5">
        <div ref={loginRef} className={`rounded-l-3xl bg-white w-1/2 flex flex-col gap-8 justify-center ${!showLogin ? 'hidden' : ''}`}>
          <h2 className="text-center text-4xl text-gray-600 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-800 from-emerald-500">
            Connectez-vous !
          </h2>
          <form className="w-full px-8 gap-7 flex flex-col items-center" id="loginForm">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adresse email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mot de passe
              </label>
            </div>
            <a href="#" onClick={() => setShowLogin(false)} className="text-emerald-600 underline underline-offset-4 font-semibold text-start hover:text-emerald-800">
              Pas de compte ? Cliquez ici pour vous inscrire !
            </a>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
            >
              Connexion
            </button>
          </form>
        </div>

        <div ref={registerRef} className={`rounded-l-3xl bg-white w-1/2 flex flex-col gap-8 justify-center ${showLogin ? 'hidden' : ''}`}>
          <h2 className="text-center text-4xl text-gray-600 font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-800 from-emerald-500">
            Inscrivez-vous !
          </h2>
          <form className="w-full px-8 gap-7 flex flex-col items-center" id="registerForm">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="floating_prenom"
                id="floating_prenom"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_prenom"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Prénom
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="floating_nom"
                id="floating_nom"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_nom"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nom
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adresse email
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[2.5px] border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mot de passe
              </label>
            </div>
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
        <img src={imgForm} alt="" className="w-1/2 rounded-r-3xl" />
      </div>
    </div>
  );
}

export default UserForm;
