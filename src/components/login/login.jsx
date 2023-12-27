import { useState } from "react";
import App from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../layouts/navbar/Navbar";
import "../register/Register.css";
// import Register from "../register/register";

function Login() {
  //   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showForgotEmail, setShowForgotEmail] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleOublier = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/send-reset-email`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: forgotEmail,
                }),
            }
        );
        if (response.ok) {
            alert("Email envoyé avec succès");
        } else {
            const text = await response.text();
            alert(text);
        }
    } catch (error) {
        console.error(
            "Erreur lors de l'envoi de l'email de réinitialisation : ",
            error
        );
    }
};

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const getLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, options);
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("@TokenUser", data.token);
        setShowSuccessAlert(true);
        alert("Vous êtes connecté(e)");
        navigate("/dashboard");
      } else {
        setShowErrorAlert(true);
        alert("La connexion a échoué");
        setError(data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="auth">
      <div className="navContainer">
        <div className="navbar">
          <Navbar />
        </div>
      </div>

      <div className="formRegister">
        <form action="" method="post">
          <input
            type="text"
            value={email}
            onChange={handleInputEmail}
            className="inputLogin"
            placeholder="Adresse email"
          />
          <label>{emailError}</label>
          <input
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={handleInputPassword}
            className="inputLogin"
            placeholder="Mot de Passe"
          />
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            Afficher le mot de passe
          </label>
          <label>{passwordError}</label>

          <div className={"inputContainer"}>
            <button
              className={"inputButton"}
              type="button"
              onClick={getLogin}
              value={"Connexion"}
              id="loginButton"
            >
              Connexion
            </button>
          </div>

          <div>
          <button className={"inputButton"} type="button" onClick={()=>setShowForgotEmail(true)} id="loginButton"> Mot de passe oublié ? </button>
          </div>
          {showForgotEmail && (
            <div>
            <input className="forgotEmail" type="email" placeholder="Entrez votre adresse email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}/>

            <button type="button" onClick={handleOublier} id="loginButton"> Envoyer </button>

            <button className={"inputButton"} type="button" onClick={()=>setShowForgotEmail(false)} value={"Connexion"} id="loginButton"> Annuler </button>
            </div>
          )}

          <div className="noAccountContainer">
            <div>
              <a href="Register">Vous n'avez pas encore de compte ?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
