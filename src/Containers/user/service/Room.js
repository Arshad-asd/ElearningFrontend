import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

// Function to get URL parameters
export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function Room() {
  // Extract the roomId parameter from the URL
  const { roomId } = useParams();
  useEffect(()=>{
    startMeeting()
  },[])

  const { userInfo } = useSelector((state) => state.auth || {});
  const decode = jwt_decode(userInfo.access);

  const { email } = decode

  const role = ZegoUIKitPrebuilt.Audience;


  const appID = 1373923553;
  const serverSecret = '7763d9daaf629e12f683b55111f78fcc';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    email
  );

  // Start the call only for the audience
  let startMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (role === ZegoUIKitPrebuilt.Audience) {
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
  };

  return (
    <>
     <div className="room-page bg-gradient-to-r from-purple-400 to-purple-600 text-white">
    {/* Add a stylish container for the live streaming (adjust the height as needed) */}
    <div className="w-full min-h-screen rounded-lg shadow-lg overflow-hidden" style={{height:'70vh'}} ref={startMeeting} />

    {/* Additional content for the audience view */}
    
  </div>
</>
  );
}

export default Room;