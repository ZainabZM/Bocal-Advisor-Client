import React, { useState } from "react";
import Navbar from "../../layouts/navbar/Navbar";
import { Link } from "react-router-dom";
import NavFilter from "../navFilter/navFilter";
import CreatePlaces from "../Places/CreatePLaces";
import RenderPlaces from "../Places/RenderPlaces";
import "./home.css";
import CreateReview from "../review/CreateReview";
import RenderReview from "../review/RenderReview";
import Show from "../Places/ShowPlaces";

export default function Home() {
  const [value, setValue] = useState("");

  console.log(value);
  return (
    <>
      {/* SECTION HEADER - START */}
      <section className="homePage">
        <div className="navContainer">
          <div className="navbar">
            <Navbar />
          </div>

          <div className="filterNavContainer">
            <NavFilter />
          </div>
        </div>
        <div className="showcase">
          <video autoPlay muted playsInline loop>
            <source src="src\nicefishes.mp4" type="video/mp4" />
          </video>
          <div className="caption">
            <h1 className="captionTitle">Avec nous vous ne ferez pas le tour du bocal !</h1>
          </div>
        </div>
      </section>
      {/* SECTION HEADER - END */}

      {/* SECTION AFFICHAGE LIEUX - START */}
      <section className="RenderPlaces">
        <RenderPlaces />
      </section>
      {/* SECTION AFFICHAGE LIEUX - END */}
    </>
  );
}
