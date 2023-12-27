import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Places from "./Places";
import "./renderPlaces.css";

function RenderPlaces(props) {
  const [places, setPlaces] = useState(null);

  /* ---- Récupère tous les lieux présents dans la bdd ------- */
  const getPlaces = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, options);
      const data = await response.json();

      console.log("getPlaces", data);
      // Vérifie si le premier élément de data est bien un tableau
      if (Array.isArray(data["0"])) {
        // Si oui, places prend la valeur de celui-ci
        setPlaces(data["0"]);
      } else {
        // Si non, erreur
        console.error("Pas un tableau:", data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);
  /* -----------  Renvoie tous les lieux présents dans la database --------- */
  const renderPlaces = () => {
    return places?.map((element, index) => {
      return (
        <div key={index}>
          <ul>
            <Link to={`/show/${element.id}`} state={element.id}>
              <Places
                title={element.title}
                city={element.city}
                // category={element.category}
                file={element.file}
                name_category={element.name_category}
              />
            </Link>
          </ul>
        </div>
      );
    });
  };

  return (
    <>
      <div className="box-container">{renderPlaces()}</div>
    </>
  );
}

export default RenderPlaces;
