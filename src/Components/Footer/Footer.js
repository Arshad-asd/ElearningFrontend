import React from "react";
import "../../Components/Footer/Footer.css";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import img from "../../assets/ElearningLogo.svg";
function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <div className="column">
          <div>
            <img src={img} alt="Logo" className="logo-image" />
          </div>
          <div>
            <p className="paragraph">
              is the delivery of learning and training through digital
              resources. Although eLearning is based on formalized learning.
            </p>
          </div>
        </div>
        <div className="column">
          <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>Company</span>

          <div className="mt-3">About Us</div>
          <div className="mt-3">How to work?</div>
          <div className="mt-3">Populer Course</div>
          <div className="mt-3">Service</div>
          <div className="mt-3">Company</div>
        </div>
        <div className="column">
          <span style={{ fontFamily: "Bebas Neue, sans-serif",marginTop:"20px" }}>Courses</span>
          <div className="mt-3">Categories </div>
          <div className="mt-3">Specialization course</div>
          <div className="mt-3">Video Course</div>
          <div className="mt-3">Live class</div>
          <div className="mt-3">Tests</div>
        </div>
        <div className="column">
          <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>Support</span>
          <div className="mt-3">FAQ</div>
          <div className="mt-3">Help Center</div>
          <div className="mt-3">Populer Course</div>
          <div className="mt-3">Career</div>
          <div className="mt-3">Privacy</div>
        </div>
        <div className="column">
          <span style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            ContactInfo
          </span>
          <div className="mt-3">+0913-705-3875</div>
          <div className="mt-3">info@elearning.com</div>
          <div className="mt-3">
            4808 Skinner Hollow Road Days Creek, OR 97429
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
