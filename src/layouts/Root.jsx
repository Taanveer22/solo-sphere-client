import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Root = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <div className="min-h-[calc(100vh-160px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Root;
