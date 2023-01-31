import React, { useEffect, useState } from "react";
import axios from "axios";
// import css"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { UserAuth } from "../context/AuthContext";
import { db } from "../context/firebaseconfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Rows = ({ title, fetchurl, rowId}) => {
  const [movies, setMovie] = useState([]);

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();


  const movieID = doc(db, 'users', `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  };

  const fetchUpcomingMovies = async (url) => {
    try {
      const response = await axios(url);
      setMovie(response.data.results);
      //   console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies(fetchurl);
  }, [fetchurl]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group ">
        <MdChevronLeft
          className="bg-white left-0 text-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "
          size={40}
          onClick={slideLeft}
        />
        <div
          id={`slider` + rowId}
          className="W-full h-full overflow-x-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto "
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white ">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center ">
                  {item.title}
                </p>
                <p onClick={saveShow}>
                  {like ? (
                    <FaHeart className="absolute top-4 left-4 text-gray-300" />
                  ) : (
                    <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          className="bg-white right-0 text-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default Rows;

// ? so basically for SLIDER functionality we just defined two function with inbuilt js and passed rowId to slide specific row.
// ?A Rows component is created with the properties title, fetchurl and rowId.
// ?The component uses the useEffect hook to fetch data from a provided URL and store the results in movies state.
// ?The component also defines two functions, slideLeft and slideRight, to slide the slider to the left and right respectively.
//? The slideLeft function uses scrollLeft property of an HTML element with id equal to "slider" + rowId to move the slider 500 pixels to the left.
// ?The slideRight function uses scrollLeft property of an HTML element with id equal to "slider" to move the slider 500 pixels to the right.
// ?The slider itself is defined as a div with className "W-full h-full overflow-x-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative" and id equal to "slider" + rowId.
// ?When a user clicks the left or right chevron icons, the corresponding slideLeft or slideRight functions are called, causing the slider to move accordingly.
