import React from "react";
import Main from "../components/Main";
import Rows from "../components/Rows";
import requests from "../Requests";

const Home = () => {
  return (
    <div>
      <Main />
      <Rows rowId="1" title="Upcoming" fetchurl={requests.requestUpcoming} />
      <Rows rowId="2" title="Popular" fetchurl={requests.requestPopular} />
      <Rows rowId="3" title="Trending" fetchurl={requests.requestTrending} />
      <Rows rowId="4" title="Top Rated" fetchurl={requests.requestTopRated} />
      <Rows rowId="5" title="Horror" fetchurl={requests.requestHorror} />
    </div>
  );
};

export default Home;
