import { useState, useEffect } from "react";
import Places from "../Places/Places";
import { useLocation } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import NavFilter from "../navFilter/navFilter";
import "./Page.css";
import { Link } from "react-router-dom";

function Page(){
    const [places, setPlaces] = useState([]);
    // valeur de search ou filtre
    const [valueSearch, setValueSearch] = useState('')
    
    // recupere la valeur dans state
    let value  = useLocation().state;

    useEffect(() => {
        getPlaces();
      }, [valueSearch]);
  
    /* --- recupere toute les lieux --- */
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
  
        // Vérifions si le premier élément de data est bien un tableau
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
    /* ---  affiche les lieux qui correspondes a valuesearch --- */
    const renderPlaces = () => {

        console.log('valuesearch ', valueSearch);
        // Renvoie tous les lieux présents dans la database
        return places?.map((element, index) => {
          
          // cherche si une valeur existe dans le tableau
            if (Object.values(element).includes(valueSearch)) {
            
                return (
                
                  <Link to={`/show/${element.id}`} state={element.id}>
                    <Places             
                      title={element.title}
                      city={element.city}
                      category={element.category}
                      file={element.file}
                      name_category={element.name_category}
                    />
                  </Link>
                
            
              );
          }

        });
        
    }

    /* --- recup la valeur de searchBar ou filtre et stock si pas vide --- */
    if(value != null && value != valueSearch){
        console.log("value" , value);
        setValueSearch(value);
    }

    return(
        <div className="page">
            <div className="navContainer">
                <div className="navbar">
                    <Navbar />
                </div>

                <div className="filterNavContainer">
                    <NavFilter />
                </div>
            </div>

            <div className="container">
                {value != null || value != undefined ? 
                  <div className="cardContainer">
                      {renderPlaces()}
                  </div>
                : 
                  <div>
                    <h2>rechercher introuvable</h2>
                  </div>
                }
            </div>

        </div>
    )
}

export default Page;