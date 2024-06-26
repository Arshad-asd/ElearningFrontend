import React from "react";
import "../../Containers/user/home/Home.css";
function UserHeader() {
  return (
    <header class=" py-5" style={{ backgroundColor: "	#6711a3" }}>
      <div class="container px-5">
        <div class="row gx-5 justify-content-center">
          <div class="col-lg-6">
            <div class="text-center my-5">
              <h3 class="display-5 fw-bolder text-white mb-2">
              Learn & Groww
              </h3>
              <p class="lead text-white-50 mb-4">
              Unlock Your Potential Empower Yourself Through Learning
              </p>
              <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <a class="btn btn-primary btn-lg px-4 me-sm-3" href="#features">
                  Get Started
                </a>
                <a class="btn btn-outline-light btn-lg px-4" href="#!">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
