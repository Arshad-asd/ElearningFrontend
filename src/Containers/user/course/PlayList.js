import React,{useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import instance from "../../Utils/axios";

const Playlist = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [preview,setPreview] = useState({})

  useEffect(() => {
    // Define a function to fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await instance.get(`/api/user/course-detail/${courseId}/`);
        setCourseDetails(response.data);
        console.log(response.data);
        setPreview({name:response.data.course_name,video:response.data.banner_image})

        // Fetch lessons for the course
        const lessonsResponse = await instance.get(`/api/user/courses/${courseId}/lessons/`);
        setLessons(lessonsResponse.data);
        console.log(lessonsResponse.data,'lessons')
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    // Call the fetchCourseDetails function
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="blog-single bg-gray-100 pt-20 pb-20">
      <div className="container p-2 ">
        <div className="flex-none  w-full xl:flex flex-wrap">
          <div className="w-full mb-3 bg-yellow-500 xl:w-8/12 ">
            <article className="article bg-white shadow-md rounded-md overflow-hidden mt-15 mb-15">
              <div className="article-img">
                <video          title=""
                  alt="" controls
                  className="w-full" src={preview.video} type="video/mp4"/>
              </div>
              <div className="article-title p-8">
                <h6 className="uppercase">
                </h6>
                {/* description section start*/}
                <h2 className="text-2xl font-semibold">
                  {preview.name}
                </h2>
                {/* description section End*/}
                {/* profile icon and date section start*/}
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <img
                       src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      title=""
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    
                  </div>
                  <div className="media-body ml-4">
                    <label className="font-semibold text-gray-600">
                      Rachel Roth
                    </label>
                    <span className="text-gray-500 text-sm">26 FEB 2020</span>
                  </div>
                </div>
              {/* profile icon and date section end*/}
              </div>
            </article>
          </div>

          {/* vide list section */}
          <div className="w-full lg:w-4/12 mb-15  lg:pl-2">
            <div className="widget  w-full h-full lg:h-1/2 xl:h-full widget-author shadow-md rounded-md overflow-y-auto mt-15">
            <div onClick={()=>setPreview({name:courseDetails.course_name,video:courseDetails.preview_video})} className="card w-full p-4 rounded-md shadow-md mb-4">
                <div className="flex">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0 mr-4">
                    <img
                      className="w-32 h-24 object-cover"
                      // src="https://placekitten.com/320/240"
                      src={courseDetails.banner_image}
                      alt="Video Thumbnail"
                    />
                  </div>

                  {/* Video Details */}
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">Video Title</div>
                    {/* Watch Time */}
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7l7-7-7-7"
                        ></path>
                      </svg>
                      <span className="text-gray-500 text-sm">
                        Watched 30 minutes ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {
                (lessons.length !== 0)?(
                  lessons.map((lesson,index)=>(
                    <div onClick={()=>setPreview({name:lesson.lesson_name,video:lesson.lesson_video})} key={index} className="card bg-white p-4 rounded-md shadow-md mb-4">
                    <div className="flex">
                      {/* Video Thumbnail */}
                      <div className="flex-shrink-0 mr-4">
                        <img
                          className="w-32 h-24 object-cover"
                          src={lesson.thumbnail_image}
                          alt="Video Thumbnail"
                        />
                      </div>
    
                      {/* Video Details */}
                      <div className="flex-1">
                        <div className="font-bold text-lg mb-2">{lesson.lesson_name}</div>
                        {/* Watch Time */}
                        <div className="flex items-center mt-2">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 12h14m-7 7l7-7-7-7"
                            ></path>
                          </svg>
                          <span className="text-gray-500 text-sm">
                            Watched 30 minutes ago
                          </span>
                        </div>
                      </div>
                    </div>
                    </div>
                  ))
                ):(
                  <div className='flex text-center w-full'>
                    <h3 className='text-blue-500 font-bold'>No Lessons</h3>
                  </div>
                )
              }
              {/* Add more cards as needed */}
            </div>
            {/* End Video list section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
