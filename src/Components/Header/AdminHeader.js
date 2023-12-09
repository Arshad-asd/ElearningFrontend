// AdminHeader.js
import React from 'react';
import '../../Components/Header/AdminHeader.css';
import { FaSearch } from 'react-icons/fa';
import img from "../../assets/ElearningLogo.svg";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="logo">
        <img src={img} alt="Logo" />
      </div>
      <div className="profile-container">
        {/* Image added as a background to the profile-image div */}
        <div className="profile-image" style={{ backgroundImage: "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')" }}></div>
      </div>
    </header>
  );
}

export default AdminHeader;
