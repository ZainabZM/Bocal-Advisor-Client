import { useEffect, useState } from "react";
import CreatePlaces from "../Places/CreatePLaces";
import './profile.css';

function Dashboard() {

    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('@TokenUser'); 

        if (!token) {
          setError('Token not found');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User data:', data.success);
          setUser(data.success);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    
    };

    getUserProfile();
  }, []);

  const ModifProfil = async () => {
    try {
      const token = localStorage.getItem('@TokenUser'); 

        if (!token) {
          setError('Token not found');
          return;
        }

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard`,
        options
      );

      if (response.ok) {
        const data = await response.json();
        console.log('User data modif:', data.success);
        setUser(data.success);
      } else {
        setError("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSave = () =>{
    ModifProfil();
    setEditing(false);
  }

  const renderContentBasedOnRole = () => {
    if (!user) {
      window.location.reload();
      return <div>Chargement...</div>;
    }

    if (user.role === 'gerant') {
      return (
          <>
      <h1 className="titleStatut">Profil : {user.role}</h1>
      {editing ? (
        <div className="identity">
          <div className="getFirstName">
          Nom: {" "}
          <input type="text"
          value={user.firstname}
          className="changeProfil"
          onChange={(e) => setUser({...user, firstname: e.target.value})} />
          </div>

          <div className="getLastName">
          Prénom: {" "}
          <input type="text"
          value={user.lastname}
          className="changeProfil"
          onChange={(e) => setUser({...user, lastname: e.target.value})} />
          </div>

          <div className="getUsername">
            Pseudo: {" "}
            <input type="text"
            value={user.pseudo}
            className="changeProfil"
            onChange={(e) => setUser({...user, username: e.target.value})} />
          </div>

          <div className="getPassword">
            Mot de passe: {" "}
            <input type="text"
            value={user.password}
            className="changeProfil"
            onChange={(e) => setUser({...user, password: e.target.value})} />
          </div>

          <button onClick={handleSave} className="saveButton">
            Sauvegarder
          </button>

          <button onClick={() => setEditing(false)} className="cancelButton">
            Annuler
          </button>
        </div>
      ) : (
        <>
        <div className="identity">
            <p>Nom : {user.firstname}</p>
            <p>Prénom : {user.lastname}</p>
            <p>Date de naissance : {user.birthday}</p>
            <p>Pseudo : {user.pseudo}</p>
            <p>Email:{user.email}</p>
            <p><span>Mot de passe : ••••••••••• </span></p>
          <button onClick={() => setEditing(true)} className="editButton">
            Modifier
          </button>
        </div>
        <CreatePlaces/>
        </>
      )}
       </>
        );
    } else if (user.role === 'membre') {
      return (
        <>
        <h1 className="titleStatut">Profil : {user.role}</h1>
        {editing ? (
          <div className="identity">
            <div className="getFirstName">
            Nom: {" "}
            <input type="text"
            value={user.firstname}
            className="changeProfil"
            onChange={(e) => setUser({...user, firstname: e.target.value})} />
            </div>
  
            <div className="getLastName">
            Prénom: {" "}
            <input type="text"
            value={user.lastname}
            className="changeProfil"
            onChange={(e) => setUser({...user, lastname: e.target.value})} />
            </div>
  
            <div className="getUsername">
              Pseudo: {" "}
              <input type="text"
              value={user.pseudo}
              className="changeProfil"
              onChange={(e) => setUser({...user, username: e.target.value})} />
            </div>
  
            <div className="getPassword">
              Mot de passe: {" "}
              <input type="text"
              value={user.password}
              className="changeProfil"
              onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>

            <button onClick={handleSave} className="saveButton">
            Sauvegarder
            </button>
  
            <button onClick={() => setEditing(false)} className="cancelButton">
              Annuler
            </button>
          </div>
        ) : (
          <div className="identity">
              <p>Nom : {user.firstname}</p><br />
              <p>Prénom : {user.lastname}</p><br />
              <p>Date de naissance : {user.birthday}</p><br />
              <p>Pseudo : {user.pseudo}</p><br />
              <p>Email : {user.email}</p><br />
              <p>Mot de passe :••••••••••• </p><br />
            <button onClick={() => setEditing(true)} className="editButton">
              Modifier
            </button>
          </div>
        )}
         </>
      );
    } else {
      return <div>Rôle non reconnu</div>;
    }
  };

  return (
    <>

      <div>
      {renderContentBasedOnRole()}
      </div>
        
    </>
  );
};

export default Dashboard;
