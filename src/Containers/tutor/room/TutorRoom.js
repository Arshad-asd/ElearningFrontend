
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { tutorInstance } from '../../Utils/axios';
// import {axiosInstance} from '../../utils/tutorAxios'
// import socket from '../../utils/socket';
function TutorRoom() {
 
  const navigate=useNavigate()

  const { tutorInfo } = useSelector((state) => state.tutorAuth || {});
  const decode = jwt_decode(tutorInfo.access);
  const { email } = decode

  const { roomId,id } = useParams();

     const handleEndLive=async(id)=>{

         const response=await tutorInstance.patch(`/live-status-update/${id}/`,{status:'completed'})
        
        navigate('/tutor/lives')
    //     socket.emit('end_live')
    }
 
  let role_str ='Host' ||'Cohost';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      :  ZegoUIKitPrebuilt.Cohost
     

  

  // Generate Kit Token for authentication
  const appID = 1007895081;
  const serverSecret = '72ffbff2322ba79844a9c3ae54eb5343';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    email
  );

  // Start the call only for the audience
  let startMeeting = async (element) => {
    try {
      const zp = ZegoUIKitPrebuilt.create(kitToken);
    
      if (role === ZegoUIKitPrebuilt.Host) {
        zp.joinRoom({
          container: element,
          scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            config: {
              role,
            },
          },
          // sharedLinks,
        });
      }
    } catch (error) {
      console.error('Error initializing Zego Express SDK:', error);
    }
    
  };

  return (
    <div className="room-page h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-purple-100 text-black">
    <div className="mb-8 text-3xl font-bold">Live Streaming Room</div>
    {/* Add a stylish container for the live streaming */}
    {role === ZegoUIKitPrebuilt.Host && (
      <div
        className="w-full  rounded-lg shadow-lg overflow-hidden"
        style={{height:'70vh'}}
        ref={startMeeting}
      />
    )}
   <button onClick={()=>handleEndLive(id)}> End Live</button> 
    </div>
  );
}

export default TutorRoom
 