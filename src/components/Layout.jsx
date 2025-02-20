import { Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Navbar from "./Navbar";
import MobileNavBar from "./MobileNavBar";
import Footer from "./Footer";

const Layout = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div className={isMobile ? 'mobile-layout' : ''}>
      <div className={`min-h-screen flex flex-col ${!isMobile ? 'bg-dark-900 text-white' : ''}`}>
        {!isMobile && <Navbar />}
        <main className={`flex-grow ${isMobile ? 'mobile-main pb-16' : ''}`}>
          <Outlet />
        </main>
        {!isMobile && <Footer />}
        {isMobile && <MobileNavBar />}
      </div>
    </div>
  );
};

export default Layout; 