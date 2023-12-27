import { useEffect, useState } from "react";
import CreateReview from "./CreateReview";
import Review from "./Review";


export default function RenderReview() {
    const [myReview, setMyReview] = useState([]);

    // LANCEMENT DES DONNÉES AU CHARGEMENT DE LA PAGE
    useEffect(() => {
        getComment();
     }, []);


    //  RÉCUPÉRATION DES DONNÉES DE L'API
    const getComment = async () => {

        let options = {
           method: "GET",
           headers: {
              "Content-Type": "application/json",
            //   Authorization: "bearer " + localStorage.getItem("@TokenUser"),
           },
        };
  
        // try {
        //    const response = await fetch(`http://127.0.0.1:8000/api/review`, options);
        //    const data = await response.json();
        //    console.log(data);
        //    setMyReview(data.reviews);
        //    if (data.success) {
        //       getComment();
        //    } 
        // //    else {
        // //       console.error("Échec de la requête HTTP");
        // //    }

        // // RÉCUPÉRATION DU PREMIER ÉLÉMENT DANS LE TABLEAU DE LA DATA AFIN D'AFFICHER LE COMMENTAIRE
        // if (Array.isArray(data["0"])) {
        //     setMyReview(data["0"]);
        // } else {
        //     console.error("Erreur lors de l'affichage du tableau :", data);
        // }

        // } catch (error) {
        //    console.error("Erreur lors de la requête : ", error);
        // }
    };
  
    //  RENDRE LES DONNÉES VISIBLES PAR L'UTILISATEUR
    const renderMyReview = () => {
        // myReview.splice(6);
        return myReview.map((element, index) => {
            return (
                <div key={index}>
                    <Review
                       comment={element.comment}
                       rate={element.rate}
                    />
                </div>
            );
        });
    };

    return (
        <>
            {/* <section className="renderReview">
                <div className="renderMyReview">{renderMyReview()}</div>
            </section> */}
        </>
    );
}