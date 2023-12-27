import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      {/* SECTION FOOTER START */}
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>Liens rapides</h3>
            <a href="#">Home</a>
            <a href="#">À propos</a>
            <a href="#">Contact</a>
            <a href="#">Connexion</a>
            <a href="#">Inscription</a>
            <a href="#">Termes d'utilisation</a>
            <a href="#">Politique de confidentialité</a>
          </div>

          <div className="box">
            <h3>Informations</h3>
            <a href="#">Bocal Academy</a>
            <a href="#">26 Boulevard Carabacel</a>
            <a href="#">06000 Nice</a>
            <a href="#">04 93 62 44 58</a>
            <a href="https://maps.app.goo.gl/t14GyQ3uu78UErnf8" target="_blank">
              <i className="fa-solid fa-caret-right"></i>
              Carte
            </a>
          </div>

          <div className="box">
            <h3>Suivez-nous</h3>
            <a href="#">
              <i className="fa-brands fa-linkedin"></i>LinkedIn
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>Instagram
            </a>
            <a href="#">
              <i className="fa-brands fa-x-twitter"></i>Twitter
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook"></i>Facebook
            </a>
            <a href="#">
              <i className="fa-brands fa-github"></i>Github
            </a>
            <a href="#">
              <i className="fa-brands fa-pinterest"></i>Pinterest
            </a>
          </div>
        </div>

        <div className="credits">          
          Projet réalisé en collaboration avec <span>Dennys</span>,
          <span>Sergio</span>, <span>Véronique</span>, <span>Zaïnab</span> |
          Formation développeur web & mobile | &copy; Bocal Academy 2023, all
          rights reserved.
        </div>

      </section>
      {/* SECTION FOOTER END */}
    </>
  );
}
