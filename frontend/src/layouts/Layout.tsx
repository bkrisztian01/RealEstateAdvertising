import { Footer } from 'components/Footer';
import NavBar from 'features/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="page-container">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
