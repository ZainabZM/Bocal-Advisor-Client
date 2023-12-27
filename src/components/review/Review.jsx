import { useEffect, useState } from "react";
import "./Review.css";
import { useLocation } from "react-router";
import RenderReview from "./RenderReview";
// data des modification
let id_review;
let comment;
let rate;
let file;
let user_Id;

export default function Review(props) {

  // condition si affiche commentaire ou modifie
  const [editing ,setEditing] = useState(false);
  // data des commentaires
  const [newReview, setNewReview] = useState({});

  const [review, setReview] = useState('null');

  const value = useLocation().state;

  const [userId, setUserId] = useState();

  const [user, setUser] = useState({});

  const DeleteReview = async (MyId) =>{
 
      let options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: MyId,
          }),
        };
  
      try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/show/${value}`,
            options
          );
         console.log(options);
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

  /*  ---- stock les data dans des variables ------ */
  const EditReview = (reviewId, paramComment, paramRate, paramFile) => {

    id_review = reviewId;

    setEditing(true);
    setNewReview({
      "comment": paramComment,
      "rate": paramRate,
      "file": paramFile,
      "reviewId": reviewId,
    });

  }
  /* ------ croix du formulaire pour fermer ------- */
  const EditClose = () => {
    setEditing(false);
  }
  /* ------- envoie les nouvelles data dans le back-end ---------- */
  const sendEdit = async() => {

    try {
    let options = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        'comment': comment != undefined ? comment : props.comment,
        'rate': rate != undefined ? rate : props.rate,
        'file_review': file != undefined ? file : props.file,
        'review_id': id_review,
      }),

    };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/update`, options);

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data) {
        alert(data.message);
      } else {
        alert("TRY AGAIN");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

  } 

  useEffect(() => {

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
  }, []);

   return (

    <>
    {/* SECTION REVIEWS - START */}
    <div className="renderMyReview">
      {editing ? (
        <>
        <div className="edit_review">

          <div className="form">
            <input type="text" value={newReview.comment} onChange={(e) => {setNewReview(e.target.value); comment = e.target.value}}/>
            <input type="number" id="" max={5} min={0} value={newReview.rate} onChange={(e) => {setNewReview(e.target.value); rate = e.target.value}}/>
            <input type="file" id="" onChange={(e) => {file = e.target.value}} />
            <button type="button" onClick={() => sendEdit(newReview.comment)}>modifier</button>
          </div>

          <div className="fa-solid fa-xmark iconsbtn x-btn" id="close-menu" onClick={()=>EditClose()} ></div>
        </div>


      </>

      ) : (
      <>
      <div className="reviewContentFirst">
        <div className="reviewContentUser">
          <div className="reviewContentAvatar">
            <i className="fa-solid fa-circle-user avatar"></i> 
          </div>

          <div className="reviewContentUsername">
            <p className="review-user"> Username : {props.user_id}</p>
            <p className="review-date">{props.created_at}</p>
          </div>
        </div>

        <div className="reviewContentRate">
          <p className="rate-comment">{props.rate} <span className="spanRate"> /5</span></p>
        </div>
      </div>
      <div className="sublikes">
        <div>
          <p>150</p>
        </div>
        <div>
          <i className="fa-solid fa-heart heart-like"> J'aime !</i>
        </div>
        <div>
          <p>20</p>
        </div>
        <div>
          <i class="fa-solid fa-heart-crack heart-like">Je n'aime pas !</i>
        </div>

      </div>

      <div className="reviewContentTwo">
        <div className="reviewContentComment">
          <div className="reviewDivComment">
            <p className="review-comment">{props.comment}</p>
            {/* <img className="review-file" src={props.file_review} alt="image non fournie"/> */}
          </div>
          <div className="reviewDivFile">
            <img className="review-file" src={props.file_review} alt="image non fournie"/>
          </div>
          <div className="reviewDivEdit">
        {console.log("reviw", props.reviewId)}
          { props.user_id === user.id && 
          <>
          <button  className="buttonReviewDelete" type="submit" onClick={()=>DeleteReview(props.reviewId)}>SUPPRIMER</button>
          <button className="buttonReviewEdit" type="submit" onClick={()=>EditReview(props.reviewId, props.comment, props.rate, props.file_Review)}>MODIFIER</button> 
          </>}
          
          
          

          </div>

          
        </div>


      </div>

      {/* <div className="reviewContentButton">
          <p><button type="submit" onClick={()=>DeleteReview(props.reviewId)}>SUPPRIMER</button></p>
        </div> */}
      </>
     )};

    </div>
    {/* SECTION REVIEWS - END */}
    </>
   );
};