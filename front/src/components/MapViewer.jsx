import { GoogleMap, LoadScript } from '@react-google-maps/api';
// import dotenv from 'dotenv'

import '../styles/components/mapviewer.sass'

// dotenv.config();

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapViewer = () => {
  return (
    <div>
      <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={ { streetView: false } }
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapViewer;