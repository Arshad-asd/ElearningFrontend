// Plan.js

import React, { useEffect, useState } from 'react';
import instance from '../../Utils/axios';
import './Plan.css';
import { loadRazorpayScript, createRazorpayOrder } from '../../Utils/razorpay';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Plan({ razorpayKey }) {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth || {});
  const decode = jwt_decode(userInfo.access);
  const { user_id } = decode;
  const { type } =userInfo
  const purchaseOrder = ['Basic','Medium','Premium']

  useEffect(() => {
    // Fetch plans from the API endpoint
    instance
      .get('/api/user/plans/')
      .then((response) => setPlans(response.data))
      .catch((error) => console.error('Error fetching plans:', error));
  }, []);

  const handleRazorpayPayment = async (planId, amount, subscriptionType) => {
    try {
      // Load the Razorpay script
      await loadRazorpayScript();

      // Create a Razorpay order
      const order = await createRazorpayOrder(planId, amount);

      // Open the Razorpay payment UI
      const options = {
        key: order.notes.key,
        amount: order.amount,
        currency: order.currency,
        name: 'Elearning',
        description: `Payment for ${planId} plan`,
        order_id: order.id,
        handler: function (response) {
          // Handle successful payment response
          console.log('Payment successful:', response);

          // Update the plan for the user
          updatePlan(planId);

          // Now, make an API call to create a subscription
          createSubscription(planId, amount, subscriptionType);
        },
        prefill: {
          email: 'user@example.com', // Replace with the user's email
          contact: '1234567890', // Replace with the user's contact number
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error handling Razorpay payment:', error);
    }
  };

  const updatePlan = (planId) => {
    // Implement the logic to update the plan for the user
    console.log(`Plan ${planId} updated for the user`);
  };

  const createSubscription = async (planId, amount, subscriptionType) => {
    try {
      // Format the current date to ISO string
      const purchaseDate = new Date().toISOString().split('T')[0];

      // Calculate the expire_date based on the subscription type
      let expireDate;
      if (subscriptionType === 'Basic') {
        expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30); // 30 days for Basic
      } else if (subscriptionType === 'Medium') {
        expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365); // 365 days for Medium
      } else {
        // Handle the case where the subscription type is not recognized
        console.error('Unsupported subscription type:', subscriptionType);
        return;
      }

      // Make an API call to create a subscription
      const response = await instance.post('/api/user/subscription/create/', {
        plan_ref: planId,
        amount: amount,
        user_ref: user_id,
        purchase_date: purchaseDate,
        expire_date: expireDate.toISOString(), // Pass the calculated expire_date
        subscription_type: subscriptionType, // Pass the subscription type
      });

      if (response.status === 201) {
        console.log('Subscription created successfully:', response.data);
        navigate('/success');
      } else {
        console.error('Failed to create subscription:', response.data);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <>
      <div className="plan-container">
        {plans.map((plan) => (
          (type!==plan.type && purchaseOrder.indexOf(plan.type)>purchaseOrder.indexOf(type))?(
            <div key={plan.type} className="columns">
                        <ul className="price" style={{ backgroundColor: plan.backgroundColor }}>
                          <li className="header">{plan.type}</li>
                          <li className="grey">₹ {plan.amount}</li>
                          <li>
                            <i
                              className="fa fa-check"
                              aria-hidden="true"
                              style={{ color: '#1dff1d', marginRight: '8px' }}
                            ></i>
                            <span style={{ marginLeft: '8px' }}>Watch all lessons</span>
                          </li>
                          <li>
                            <i
                              className="fa fa-check"
                              aria-hidden="true"
                              style={{ color: '#1dff1d', marginRight: '8px' }}
                            ></i>
                            <span style={{ marginLeft: '8px' }}>Practice workouts</span>
                          </li>
                          <li>
                            <i
                              className="fa fa-check"
                              aria-hidden="true"
                              style={{ color: '#1dff1d', marginRight: '8px' }}
                            ></i>
                            <span style={{ marginLeft: '8px' }}>Live class access</span>
                          </li>
                          <li>
                            {plan.type === 'Premium' ? (
                              <i
                                className="fa fa-check"
                                aria-hidden="true"
                                style={{ color: '#1dff1d', marginRight: '8px' }}
                              ></i>
                            ) : (
                              <i className="fa fa-times" aria-hidden="true" style={{ color: 'red', marginRight: '8px' }}></i>
                            )}
                            <span style={{ marginLeft: '8px' }}>Lifetime access</span>
                          </li>
                          
                            {/* Pass the planId, amount, and subscriptionType to the Razorpay function on button click */}
                            {(type)?(
                              <li className="grey">
                                <button
                                  className="button"
                                  onClick={() => handleRazorpayPayment(plan.id, plan.amount, plan.type)}
                                >
                                  Upgrade Plan
                                </button>
                              </li>
                            ):(
                              <li className="grey">
                                <button
                                  className="button"
                                  onClick={() => handleRazorpayPayment(plan.id, plan.amount, plan.type)}
                                >
                                  Buy Now
                                </button>
                              </li>
                            )}
                        </ul>
            </div>
          ):purchaseOrder.length-1 == purchaseOrder.indexOf(plan.type)?(
              <p>No available plans</p>
          ):null
        ))}
      </div>
    </>
  );
}

export default Plan;
