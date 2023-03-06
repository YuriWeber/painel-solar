import { GoogleMap, LoadScript } from '@react-google-maps/api';

import '../styles/components/mapviewer.sass'

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
    <LoadScript
      googleMapsApiKey="AIzaSyA0Z6lkNhCOhDY0qXmdISI_fcV2oFoco00"
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
  )
}

export default MapViewer;