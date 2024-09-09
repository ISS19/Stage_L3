import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const position: LatLngExpression = [-21.453, 47.085];

const Map: React.FC = () => {
  return (
    <MapContainer center={position} zoom={13} style={{ height: '620px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Votre position actuel
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
