import { useEffect, useState } from "react";
import "./Review.css";
import { useLocation } from "react-router";

export default function CreateReview({}) {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("");
  const [userId, setUserId] = useState(1);
  const [fileReview, setFileReview] = useState("");

  let review = { comment, rate };

  const value = useLocation().state;
  console.log("loc", value);

  //  RÉCUPÉRATION DES DONNÉES DE L'API
  const handleReview = async (e) => {
    console.log("filereview: ", fileReview);
    e.preventDefault();

    // Créé un nouvel objet formData qui paire les champs du formulaire et leurs valeurs
    const formData = new FormData();
    // Ajoute les paires suivantes dans formData
    formData.append("comment", comment);
    formData.append("rate", rate);
    formData.append("place_id", value);
    formData.append("user_id", userId);
    formData.append("file_review", fileReview);
    




    // let options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     comment: comment,
    //     rate: rate,
    //     place_id: value,
    //     user_id: userId,
    //     file_review: fileReview,
    //   }),
    // };

    let options = {
      method: "POST",
      /* headers: {'Content-Type': 'application/json'}, */
/*       body: JSON.stringify([{
        title: title,
        street: street,
        postcode: postcode,
        city: city,
        category: userChoice,
        description: description,
      }]), */
      body : formData,

    };


    console.log(`option :`, options);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/show/${value}`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);

      //  =========> TOKEN CONNECTION
      if (data) {
        alert(data.message);
      } else {
        alert("TRY AGAIN :( ");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  // useEffect(() => {
  //     handleReview();
  //   }, [placeId]);

  return (
    <>
      <section className="create-review">
        <p>Laisser un commentaire et une note à l'établissement :</p>
        <div className="box-create">
          <form action="" method="POST">
            <div className="reviewContentCreate">
              <div>
                <i class="fa-solid fa-pen-to-square image-logo"></i>
              </div>
              <div>
                <textarea
                  name="comment"
                  cols="80"
                  rows="2"
                  placeholder="Décrivez içi vos impressions ..."
                  required
                  className="review-textarea"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="reviewContentCreateRate">
                <input
                  type="number"
                  name="rate"
                  placeholder="Note"
                  required
                  min="0"
                  max="5"
                  className="review-inputRate"
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>

            <div className="reviewContentCreate">
              <div>
                <i class="fa-solid fa-image image-logo"></i>
              </div>
              <div>
                <input
                    type="file"
                    name="file_review"
                    className="reviewContentInputFile"
                    placeholder="Postez une photo de type : png, jpg, jpeg"
                    onChange={(e) => setFileReview(e.target.files[0])}
                  />
              </div>
        
              <div>
                <button
                  type="submit"
                  className="login-title createValidate"
                  onClick={handleReview}
                >
                  Poster
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
