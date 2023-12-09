import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CourseListSection = ({ selectedSubcategory, courses }) => {
    const { userInfo } = useSelector((state) => state.auth || {});
    const { type } = userInfo;

    return (
        <div className="container px-4 px-lg-5 mt-5">
            <h2 className="text-2xl font-bold text-center mb-4">
                {selectedSubcategory.sub_category_name} Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {courses.map((course) => (
                    <div key={course.id} className="col mb-5">
                        <div className="card h-100">
                            <img
                                className="card-img-top"
                                src={course.banner_image}
                                alt={course.course_name}
                            />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">{course.course_name}</h5>
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                    {type === 'Premium' || type === 'Medium' || type === 'Basic' ? (
                                        <Link
                                            className="btn btn-outline-dark mt-auto"
                                            to={`/playlist/${course.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            View
                                        </Link>
                                    ) : (
                                        <Link
                                            className="btn btn-outline-dark mt-auto"
                                            to="/plans"  // Provide the link for subscription
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Subscribe
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseListSection;
