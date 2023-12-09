// CourseHeader.jsx
import React from 'react';

const CourseHeader = () => {
    return (
        <header className="bg-dark py-5">
            <div className="container-fluid px-4 px-lg-5 my-5"> {/* Change 'container' to 'container-fluid' */}
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">Top courses</h1>
                    <p className="lead fw-normal text-white-50 mb-0">Learn New things in the digital world</p>
                </div>
            </div>
        </header>
    );
};

export default CourseHeader;
