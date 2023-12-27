import "./NavFilter.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavFilter() {
  const [value, setValue] = useState('test')

  return (
    <div className="littleFilter">
      <div className="linkFilter">
        <Link className="linkCat" to={`/page/${value}`} state={'Hôtel'}>Hôtels</Link>
      </div>
      <div className="linkFilter">
        <Link className="linkCat" to={`/page/${value}`} state={'Restaurant'}>Restaurant</Link>
      </div>
      <div className="linkFilter">
        <Link className="linkCat" to={`/page/${value}`} state={'Activités'}>Activités</Link>
      </div>
      <div className="linkFilter">
        <Link className="linkCat" to={`/page/${value}`} state={'Bar'}>Bar</Link>
      </div>
    </div>
  );
}
export default NavFilter;
