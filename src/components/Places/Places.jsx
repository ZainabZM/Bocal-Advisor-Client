import "./renderPlaces.css";

function Places(props) {
  return (
    <div className="boxPlaces">
      <div className="image-place">
        <img src={props.file} alt="Place Image" />
      </div>
      <div className="content">
        <h3>{props.title}</h3>
        <p>{props.city}</p>
        <p>{props.name_category}</p>
      </div>
    </div>
  );
}

export default Places;
