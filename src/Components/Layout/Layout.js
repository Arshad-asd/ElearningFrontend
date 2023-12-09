import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Routers from "../../Containers/routes/Routers";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../../Components/Sidebar/AdminSidebar";
import TutorSidebar from "../../Components/Sidebar/TutorSidebar";
import Footer from "../Footer/Footer";

function Layout() {
  let location = useLocation();
  let tutorHeader = location.pathname.startsWith("/tutor");
  let adminHeader = location.pathname.startsWith("/admin");

  // Check if it's the wildcard route
  let isWildcardRoute = location.pathname === "*";

  return (
    <>
      {/* Show TutorSidebar if it's a tutor route */}
      {tutorHeader && <TutorSidebar />}

      {/* Show AdminSidebar if it's an admin route */}
      {adminHeader && <AdminSidebar />}

      {/* Show Navbar only if it's not a tutor or admin route and not the wildcard route */}
      {!tutorHeader && !adminHeader && !isWildcardRoute && <Navbar />}

      <Routers />

      {/* Show Footer only if it's the wildcard route */}
      {isWildcardRoute && <Footer />}
    </>
  );
}

export default Layout;
