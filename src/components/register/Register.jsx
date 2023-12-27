import { useState } from "react";

import "./register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import Login from "../login/login";

function Register() {
  const [role, setRole] = useState("membre");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirhday] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let user = { firstname, lastname, email, password, username, birthday, role };

  const handleRegister = async (e) => {
    
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);

      if (data) {
        alert(data.message);
        navigate("/login");
      } else {
        alert("TRY AGAIN");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // bouton choix membre / gerant
  function choiceInscription($choice) {
    let membre_btn = document.querySelector(".membre-btn");
    let gerant_btn = document.querySelector(".gerant-btn");

    if ($choice == "gerant") {
      
      setRole("gerant");

      gerant_btn.classList.add("active");
      membre_btn.classList.remove("active");
    } else {
      
      setRole("membre");

      gerant_btn.classList.remove("active");
      membre_btn.classList.add("active");
    }
  }

  return (
    <div className="auth">
      <div className="navContainer">
        <div className="navbar">
          <Navbar />
        </div>
      </div>

      <div className="formRegister">
        <div className="choice-btn">
          <p
            className="membre-btn active"
            onClick={() => choiceInscription("membre")}
          >
            membre
          </p>
          <p className="gerant-btn" onClick={() => choiceInscription("gerant")}>
            gerant
          </p>
        </div>

        <form action="" method="POST">
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            className="inputRegister"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            className="inputRegister"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            className="inputRegister"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            className="inputRegister"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="birthday"
            className="inputRegister"
            placeholder="Votre date d'anniversaire (format : yyyy/mm/dd)"
            required
            onChange={(e) => setBirhday(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="inputRegister"
            placeholder="Mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleRegister}>
            Inscription
          </button>
        </form>
        <a href="Login">Déja un compte ?</a>
      </div>
    </div>
  );
}

export default Register;
