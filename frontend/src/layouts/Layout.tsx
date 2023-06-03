import { Footer } from 'components/Footer';
import { NavBar } from 'components/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="page-container">
        <NavBar />
        <main className="content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
