import { useState } from "react";
import "./Search.css";
import Page from "../page/Page";
import { Link } from "react-router-dom";

function Search() {
  const [value, setValue] = useState()

  return (
    <div className="search">
      <div>
        <input type="text" name="search" placeholder="Quelle destination ?" onChange={(e) => setValue(e.target.value)}></input>
      </div>
      <div className="search-btn">
        {/* state = utilisée pour définir une valeur avec état pour le nouvel emplacement qui est stocké dans l'historique state . */}
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <Link to={`/page/${value}`} state={value}><span  className="searchTitle">rechercher</span></Link>
      </div>
    </div>
  );
}
export default Search;
