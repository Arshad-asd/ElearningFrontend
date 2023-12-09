// Success.js

import React from 'react';
import successGif from '../../assets/successgif.gif';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-white p-16 rounded-md shadow-md text-center">
        <div className="rounded-full h-32 w-32 bg-yellow-200 mx-auto">
          {/* Use img element instead of i element for the GIF */}
          <img src={successGif} alt="Success GIF" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-green-600 font-bold text-4xl mt-6">Success</h1>
        <p className="text-gray-700 font-semibold text-lg">
          We received your purchase request;<br /> we'll be in touch shortly!
        </p>
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-success block w-full py-3"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
