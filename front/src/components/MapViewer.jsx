import { GoogleMap, useLoadScript, MarkerF, StandaloneSearchBox } from '@react-google-maps/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeLocation } from '../redux/locationSlice';

import '../styles/components/mapviewer.sass'

const style = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  }
]


const MapViewer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ['places'],
  })

  if (!isLoaded) return <div>Carregando...</div>
  return <Map id='temp' />
}

const Map = () => {
  const [ searchBox, setSearchBox ] = useState();
  const [ position, setPosition ] = useState()
  const [ center, setCenter ] = useState({ lat: -27.59, lng: -48.54 })
  const dispatch = useDispatch()

  function onLoad(ref) {
    setSearchBox(ref)
  }

  async function addMarker(event) {
    const positionClicked = event.latLng

    const lat = positionClicked.lat()
    const lng = positionClicked.lng()
    
    setPosition({
      lat: lat,
      lng: lng
    })

    handleLocation(lat, lng, '')
  }

  function onPlacesChanged() {
    const places = searchBox.getPlaces()
    const place = places[0]

    const lat = place.geometry.location.lat() || 0
    const lng = place.geometry.location.lng() || 0
    const description = place.formatted_address

    const location = {
      lat: lat,
      lng: lng
    }

    setPosition(location)
    setCenter(location)

    handleLocation(lat, lng, description)
  }

  function handleLocation(lat, lng, description) {
    dispatch(changeLocation({
      lat,
      lng,
      description
    }))
  }

  return (
    <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={15}
          onClick={e => addMarker(e)}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            clickableIcons: false,
            styles: style
          }}
        >

          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input type="text" placeholder="Pesquisar endereço..." className='input-address' />
          </StandaloneSearchBox>

          {position && <MarkerF position={position} />}
        </GoogleMap>
    </div>
  )
}

export default MapViewer;