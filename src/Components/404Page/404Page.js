import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import errorGif from '../../assets/404-error-page-svg-animation.gif';

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    // Navigate to the homepage ("/") and apply your styling logic
    navigate('/');
  };

  return (
    <div className='h-screen'>
<section className="flex items-center h-full p-16 bg-black text-gray-100 dark:bg-black dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <img src={errorGif} alt="404 Error" className="mx-auto mb-8" />

            {/* <h2 className="font-extrabold text-9xl">
              <span className="sr-only bg-indigo-500 ">Error</span>404
            </h2> */}
            <p className="text-2xl font-semibold md:text-3xl transition-transform transform hover:scale-110">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-400 dark:text-gray-400">
              But don't worry, you can find plenty of other things on our homepage.
            </p>
            <button
              onClick={handleNavigateHome}
              className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900 bg-sky-500/50 dark:text-gray-900 hover:bg-white hover:text-black"
            >
              Back to homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
