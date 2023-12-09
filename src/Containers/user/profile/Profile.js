import React, { useState, useEffect } from "react";
import "../../../Containers/tutor/profile/Profile.css";
import EditForm from "./EditForm";
import instance from "../../Utils/axios";
import SubscriptionDetails from "./SubscriptionDetails";
function TutorProfile() {
  const [showForm, setShowForm] = useState(false);
  const [userData , setUserData] = useState('');

  const userId = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user_id
    : null;
  const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).access
    : null;
    useEffect(() => {
  const fetchUserData = async () =>{
    try{
      const response = await instance.get(`/api/user/detail-view/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data,'data')
      setUserData(response.data)
    }catch (error) {
      console.error("Error fetching user data", error);
    }
  }
  fetchUserData();
}, [userId, token]);
const {first_name} = userData
  const  handleEditClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "	#fcdad1" }}>
      <div className="container ">
        <div className="row gutters row-with-padding">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 "style={{ height: "60vh", backgroundColor: "	#fcdad1" }}>
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar with-border flex items-center justify-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdE5vknOx-qLzTCFwcHv4c2gaQEgwV25KmSg&usqp=CAU"
                        alt="Maxwell Admin"
                        className="w-24 h-24 mx-auto rounded-full border-2 border-gold transition-transform hover:scale-125"
                      />
                    </div>
                    <h5 className="user-name">{first_name}</h5>
                    <h6 className="user-email">{userData.email}</h6>
                  </div>
                  <div className="centered-container">
                    <div className="row-container">
                      <div className="colum" onClick={handleEditClick}>
                        <i
                          className="fas fa-edit "
                          style={{ color: "blue" }}
                        ></i>
                        <span className="icon" style={{ marginLeft: "10px" }}>
                          Edit
                        </span>
                      </div>
                      {/* <div className="colum">
                       <i className="fas fa-certificate"style={{color:"gold"}}></i> 
                      <span className="icon"style={{marginLeft:"10px"}}>
                       Badge
                      </span>
                      </div> */}
                      {/* <div className="colum">
                      <i className="fas fa-eye"></i>
                      <span className="icon"style={{marginLeft:"10px"}}>
                         Views
                      </span>
                      </div> */}
                      {/* <div className="colum">
                      <i className="fas fa-users"></i> 
                      <span className="icon" style={{ paddingLeft: "10px" }}>
                        Followers
                      </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showForm ? <EditForm /> : <SubscriptionDetails />}

        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
