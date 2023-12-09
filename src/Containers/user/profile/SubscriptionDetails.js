// SubscriptionDetails.js
import React, { useEffect, useState } from "react";
import instance from "../../Utils/axios";
import { useSelector } from 'react-redux';

function SubscriptionDetails() {
  const [subscriptions, setSubscriptions] = useState([]);
  const { userInfo } = useSelector((state) => state.auth || {});
  const {access} = userInfo
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await instance.get('/api/user/subscriptions/', {
          headers: {
            'Authorization': `Bearer ${access}`,  // Include your authentication token
          },
        });
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    // Call the fetchSubscriptions function
    fetchSubscriptions();
  }, []);  // The empty dependency array ensures that this effect runs only once

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12" style={{backgroundColor: "	#fcdad1"}}>
    <div className="card h-100">
    <h5>SubscriptionDetails</h5>

      <div className="card-body">
          <div className="flex grid lg:grid-cols-3 grid-cols-1">
        {subscriptions.map(subscription => (
          <div key={subscription.id} className="m-2 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
            <div className="flex font-bold text-lg mb-2 text-center">{subscription.subscription_type}</div>
              <ul className="list-disc pl-4 text-sm text-gray-700">
                <li>Watch all lessons</li>
                <li>Practice workouts</li>
                <li>Live class access</li>
                <li>Lifetime access</li>
              </ul>
            </div>
            <div className="px-4 py-2">
              <div className="text-gray-700 text-sm">
                <p>Expires on: {subscription.expire_date}</p>
                <p>Purchase Amount: ${subscription.amount}</p>
              </div>
            </div>
            <div className="px-2 py-2 flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}

export default SubscriptionDetails;
