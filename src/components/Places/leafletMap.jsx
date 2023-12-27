// video leaflet = https://www.youtube.com/watch?v=jD6813wGdBA
// map
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import "./showPlacew.css";

function Leaflet(props){

    /* ----- montre l'emplacement exact du lieu ---- */
    const markers = [
        {
            geocode:[props.latitude,props.longitude],
            popUp: "hello, I am here"
        }
    ]

    return(
        <div>
            {props.latitude == null || props.longitude ? 
                    <MapContainer center={[props.latitude,props.longitude]} zoom={14}>

                        <TileLayer 
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
        
                        {markers.map(marker => (
                            <Marker position={marker.geocode}>
                                
                            </Marker>
                        ))}
                    </MapContainer>
                :
                <div>valeur de localisation incorrect ou inexistante</div>
            }

        </div>


    )
}

export default Leaflet;