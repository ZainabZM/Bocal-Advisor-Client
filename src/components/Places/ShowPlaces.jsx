import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import "./showPlacew.css";
import Leaflet from "./leafletMap";
import Review from "../review/Review";
import RenderReview from "../review/RenderReview";
import CreateReview from "../review/CreateReview";
import Navbar from "../../layouts/navbar/Navbar";

let user_Id;

function Show({ placeId }) {
  const [user, setUser] = useState({});
  const [place, setPlace] = useState("null");
  // tableau de tous les commentaire en lien avec le lieu
  const [reviewVariable, setReviewVariable] = useState([]);
  const [error, setError] = useState(null);

  /* ---- VALEUR POUR LA CARTE -------- */
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const value = useLocation().state;
  const navigate = useNavigate();

  // ------------- RECUPERE LES DETAILS DU LIEU A AFFICHER -------------- //

  const [userId, setUserId] = useState();
  
  const handleShow = async () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/show/${value}`,
        options
      );

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPlace(data.place);
      setReviewVariable(data.review);

      setLatitude(data.place.y);
      setLongitude(data.place.x);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ------------- SUPPRIMER -------------- //
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete/${value}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data.message);
        navigate("/");
        alert(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    handleShow();

    // ------------- VERIFIE SI L'UTILISATEUR EST BIEN CONNECTE POUR POUVOIR COMMENTER -------------- //

    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("@TokenUser");

        if (!token) {
          setError("Connectez-vous pour pouvoir commenter");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.success);
          user_Id = data.success.id;
          setUserId(data.success.id);
        } else {
          setError("Connectez-vous pour pouvoir commenter.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Connectez-vous pour pouvoir commenter.");
      }
    };

    getUserProfile();
  }, [placeId]);

  // ------------- AFFICHE LE LIEU -------------- //
  const renderPlace = () => {
    return (
      <>
        <div className="showPlaceContainer">
          <div>
            <h1 className="showTitle">{place.title}</h1>
          </div>
          <div>
            <div className="showLocation">
              <div className="adresse">
                  <i class="fa-solid fa-location-dot locationIcon"></i>
                  <p className="adresseInformation">{place.street}, </p>
                  <p className="adresseInformation">{place.postcode}</p>
                  <p className="adresseInformation">{place.city}</p>
              </div>
              <div>
                <h2>{place.name_category}</h2>
              </div>

            </div>
          </div>
          <div className="showContent">
            <div className="showFile">
              <img src={place.file}></img>
            </div>
            <div className="about">
              <h2 className="aboutTitle">À Propos</h2>
              <p className="aboutParagraphe">{place.description}</p>
            </div>
          </div>
        </div>

        <div>
          <button className="buttonShow" onClick={handleDelete}>Modifier</button>
          {place.user_id === user.id && <button className="button" onClick={handleDelete}>Supprimer</button>}

        </div>


        {/* SECTION MAP - START */}
        <div className="showMap">
          <h1 className="showMapTitle">Emplacement</h1>
          {longitude != undefined || latitude != undefined ? (
            <Leaflet latitude={latitude} longitude={longitude}></Leaflet>
          ) : (
            <div>erreur recuperation des données de localisation</div>
          )}
        </div>
        {/* SECTION MAP - END  */}

        <div className="reviews"></div>
      </>
    );
  };

  //  RENDRE LES DONNÉES VISIBLES PAR L'UTILISATEUR POUR LES REVIEWS
  const renderMyReview = () => {
    return reviewVariable.map((element, index) => {
      return (
        <div key={index}>
          {console.log("review 2")}
          <Review
            comment={element.comment}
            created_at={
              new Date(element.created_at).toLocaleDateString("fr", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) +
              " | " +
              new Date(element.created_at).toLocaleTimeString("fr", {
                hour: "numeric",
                minute: "numeric",
              })
            }
            rate={element.rate}
            reviewId={element.id}
            user_id={element.user_id}
            file_review={element.file_review}
          />
        </div>
      );
    });
  };

  return (
    <>
      {/* SECTION HEADER - START */}
      <div className="navbar">
        <Navbar />
      </div>
      {/* SECTION HEADER - END */}

      {/* SECTION SHOWPLACE - START */}
      <div className="renderPlaceParent">{renderPlace()}</div>
      {/* SECTION SHOWPLACE - END */}

      {/* SECTION RENDERREVIEW - START */}
      {user.role === "membre" && (
        <div>
          <CreateReview />
        </div>
      )}
      {/* SECTION RENDERREVIEW - END */}

      {/* SECTION SHOWPLACE - START */}
      <section className="renderReview">{renderMyReview()}</section>
      {/* SECTION SHOWPLACE - END */}
    </>
  );
}

export default Show;
