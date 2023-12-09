// SubCategorySection.jsx
import React, { useState, useEffect } from 'react';
import instance from '../../Containers/Utils/axios';
import CourseList from './CourseListSection';

const SubCategorySection = ({ selectedCategory, subcategories }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses for the selected subcategory
    if (selectedSubcategory) {
      instance.get(`/api/user/course-list/?sub_category_ref=${selectedSubcategory.id}`)
        .then(response => setCourses(response.data))
        .catch(error => {
          console.error('Error fetching courses:', error);
          // You might want to set courses to an empty array or show an error message
          setCourses([]);
        });
    }
  }, [selectedSubcategory]);
  return (
    <div className="container px-4 px-lg-5 mt-5" id='subcategories'>
      {selectedCategory && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedCategory.category_name} Subcategories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subcategories.map(subcategory => (
              <div key={subcategory.id} className="col mb-5">
                <div className="card h-100">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">
                        {subcategory.sub_category_name}
                      </h5>
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-dark mt-auto"
                        onClick={() => setSelectedSubcategory(subcategory)}
                      >
                        View Courses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedSubcategory && courses.length > 0 && (
        <CourseList selectedSubcategory={selectedSubcategory} courses={courses} />
      )}
    </div>
  );
};

export default SubCategorySection;
