import { Footer } from 'components/Footer';
import { NavBar } from 'features/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="box">
        <NavBar />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
