import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting the data from location of previous component
  const courseDetails = useLocation().state;    
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // to play the video accordingly
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(courseDetails._id));
  };

  // fetching the course lecture data
  useEffect(() => {
    (async () => {
        if(!courseDetails) navigate("/courses");
      await dispatch(getCourseLecture(courseDetails._id));
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-6 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        {/* displaying the course name */}

        <h1 className="text-center text-2xl font-semibold flex justify-center gap-2">
          <span className="text-yellow-500">Course Name :</span>
          <span>{courseDetails?.title}</span>
        </h1>

        <div>
            {lectures.length==0 && role!=='ADMIN' && <h1 className="text-center font-semibold"> Lectures will be uploaded soon... </h1> 
            }
        </div>

        <div>
            {lectures.length==0 && role==='ADMIN' && <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { ...courseDetails },
                    })
                  }
                  className="bg-yellow-500 cursor-pointer btn-primary px-2 py-1 rounded-md font-semibold text-base"
                >
                  Add New Lecture 
                </button> 
            }
        </div>

        

        {lectures && lectures.length>0 && <div className="flex justify-center gap-10 w-full">
          {/* left section for playing the video and displaying course details to admin */}
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <h1>
                <span className="text-yellow-500 font-semibold">Title : </span>
                <span className="font-semibold">{lectures && lectures[currentVideoIndex]?.title}</span>
              </h1>
              <p>
                {" "}
                <span className="text-yellow-500 font-semibold line-clamp-4">
                  Description :{" "}
                </span>
                {lectures && lectures[currentVideoIndex]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying all the lectures of the course */}
          <ul className="w-[28rem] h-[375px] p-2 rounded-lg shadow-[0_0_10px_black] flex flex-col">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { ...courseDetails },
                    })
                  }
                  className="btn-primary cursor-pointer flex items-center px-2 py-1 rounded-md font-semibold text-sm"
                >
                  <AiOutlinePlus/>Add New Lecture
                </button>
              )}
            </li>
            <div className="flex-1 overflow-y-auto space-y-3 mt-2">
              {lectures && lectures.map((element, index) => {
                  return (
                    <li className="space-y-2" key={element._id}>
                      <p className="cursor-pointer" onClick={() => setCurrentVideoIndex(index)}>
                        <span className="text-yellow-500">
                          {" "}
                          Lecture {index + 1} :{" "}
                        </span>
                        {element?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            handleLectureDelete(courseDetails?._id, element?._id)
                          }
                          className="btn-primary px-2 py-1 rounded-md font-semibold text-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </div>
          </ul>
        </div>} 
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;