import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet /> {/* Contenu des pages */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
