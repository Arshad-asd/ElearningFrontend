import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import instance from "../../Containers/Utils/axios";
import SubCategorySection from "./SubCategorySection";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    instance
      .get(`/api/user/category-list/?page=${pageNumber + 1}`)
      .then((response) => {
        setCategories(response.data.results);
        setPageInfo({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          results: response.data.results,
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [pageNumber]);

  const pageCount = Math.ceil(pageInfo.count / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    // Reset selectedCategory when pagination changes
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Fetch subcategories for the selected category
    instance
      .get(`/api/user/subcategory-list/${category.id}/`)
      .then((response) => setSubcategories(response.data))
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        // You might want to set subcategories to an empty array or show an error message
        setSubcategories([]);
      });
  };

  return (
    <section className="py-5" >
      <div className="container px-4 px-lg-5 mt-5">
      <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-bold">Categories</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={category.image}
                  alt={category.category_name}
                />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">{category.category_name}</h5>
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <a
                      className="btn btn-outline-dark mt-auto"
                      href="#"
                      onClick={() => handleCategoryClick(category)}
                    >
                      View SubCategories </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={<i className="fas fa-chevron-left"></i>}
          nextLabel={<i className="fas fa-chevron-right"></i>}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "pagination flex justify-center items-center space-x-2"
          }
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"rounded-full bg-gray-300 px-3 py-2 cursor-pointer"}
          previousClassName={
            "rounded-full bg-gray-300 px-3 py-2 cursor-pointer"
          }
          nextClassName={"rounded-full bg-gray-300 px-3 py-2 cursor-pointer"}
          breakClassName={"rounded-full bg-gray-300 px-3 py-2 cursor-pointer"}
        />
      </div>

      {/* Render subcategories outside the category section */}
      {selectedCategory && (
        <SubCategorySection selectedCategory={selectedCategory} subcategories={subcategories} />
      )}
    </section>
  );
};

export default CategorySection;
