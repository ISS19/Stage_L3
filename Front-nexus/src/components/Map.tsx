import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import axios from 'axios';

const defaultIcon = L.icon({
  iconUrl: '/Location_48px.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const clinicIcon = L.icon({
  iconUrl: '/green.png', 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const hospitalIcon = L.icon({
  iconUrl: '/red.png', 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const pharmacyIcon = L.icon({
  iconUrl: '/blue.png', 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

delete (L.Marker.prototype as any)._getIconUrl;
L.Marker.prototype.options.icon = defaultIcon;

const SetViewOnPosition = ({ position }: { position: LatLngExpression | null }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position as LatLngExpression, 13); 
    }
  }, [position, map]);

  return null;
};

const Map: React.FC = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [medicalFacilities, setMedicalFacilities] = useState<
    Array<{ lat: number; lon: number; name?: string; type: string }>
  >([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
        fetchMedicalFacilities(latitude, longitude);
      },
      (error) => {
        setError('Impossible de récupérer votre position.');
        console.error('Erreur de géolocalisation :', error);
        setLoading(false);
      }
    );
  }, []);

  const fetchMedicalFacilities = async (lat: number, lon: number) => {
    try {
      const overpassUrl = `https://overpass-api.de/api/interpreter`;
      const query = `
        [out:json];
        (
          node[amenity=clinic](around:5000, ${lat}, ${lon});
          node[amenity=hospital](around:5000, ${lat}, ${lon});
          node[amenity=pharmacy](around:5000, ${lat}, ${lon});
        );
        out body;
      `;
      const response = await axios.post(overpassUrl, query, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const facilities = response.data.elements.map((element: any) => ({
        lat: element.lat,
        lon: element.lon,
        name: element.tags.name,
        type: element.tags.amenity,
      }));
      setMedicalFacilities(facilities);
    } catch (error) {
      console.error('Erreur lors de la récupération des établissements médicaux :', error);
    }
  };

  return (
    <div>
      {loading && <p>Récupération de votre position en cours...</p>}
      {error && <p>{error}</p>}
      <MapContainer
        center={position || [-21.453, 47.085]}
        zoom={13}
        style={{ height: '620px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position}>
            <Popup>
              Vous êtes ici
            </Popup>
          </Marker>
        )}
        {medicalFacilities.map((facility, index) => {
          let icon;
          switch (facility.type) {
            case 'clinic':
              icon = clinicIcon;
              break;
            case 'hospital':
              icon = hospitalIcon;
              break;
            case 'pharmacy':
              icon = pharmacyIcon;
              break;
            default:
              icon = defaultIcon;
          }

          return (
            <Marker
              key={index}
              position={[facility.lat, facility.lon]}
              icon={icon}
            >
              <Popup>
                {facility.name || 'Établissement médical'}<br />
                Type: {facility.type}
              </Popup>
            </Marker>
          );
        })}
        <SetViewOnPosition position={position} /> 
      </MapContainer>
    </div>
  );
};

export default Map;
