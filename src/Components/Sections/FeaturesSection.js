import React from "react";
import "../../Containers/user/home/Home.css";
import { BiSolidVideos } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsBoxArrowInRight } from "react-icons/bs";
const FeaturesSection = () => {
  return (
    <section className="py-5 border-bottom" id="features">
      <div className="container px-5 my-5">
        <div className="row gx-5">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
              <BiSolidVideos />
            </div>
            <h2 className="h4 fw-bolder">Live classes</h2>
            <p>
              Live online classes are synchronous events organized in a live
              virtual meeting room where students and teachers meet together to
              communicate with voice, video, whiteboard.
            </p>
            <a className="text-decoration-none" href="#!">
              Call to action
              <BsBoxArrowInRight />
            </a>
          </div>
          <div
            className="col-lg-4 mb-5 mb-lg-0"
            style={{
              transition: "background-position 0.3s",
              padding: "10px",
              display: "inline-block",
              backgroundImage:
                "linear-gradient(to left, 	#7afbff 50%, white 50%)",
              backgroundSize: "200% 100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '-100% 0';
              e.currentTarget.style.color = 'white'; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '0% 0';
              e.currentTarget.style.color = 'black'; 
            }}
          >
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
              <GrCertificate />
            </div>
            <h2 className="h4 fw-bolder">Earn a certificate</h2>
            <p>
              To earn the certificate, students are required to take a business
              language course, pertinent international business classes, and
              participate in an international field study.
            </p>
            <a className="text-decoration-none" href="#!">
              Call to action
              <BsBoxArrowInRight />
            </a>
          </div>
          <div className="col-lg-4">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
              <VscWorkspaceTrusted />
            </div>
            <h2 className="h4 fw-bolder">Get readdy for career</h2>
            <p>
              A career goal is a result you want to achieve in your professional
              life. It's important to set career goals so you can focus on
              progress and have plans to achieve your goals.{" "}
            </p>
            <a className="text-decoration-none" href="#!">
              Call to action
              <BsBoxArrowInRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
