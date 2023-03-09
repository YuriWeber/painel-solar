import { GoogleMap, useLoadScript, MarkerF, StandaloneSearchBox } from '@react-google-maps/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeLocation } from '../redux/locationSlice';

import '../styles/components/mapviewer.sass'

const MapViewer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ['places'],
  })

  if (!isLoaded) return <div>Carregando...</div>
  return <Map />
}

const Map = () => {
  const [ searchBox, setSearchBox ] = useState();
  const [ position, setPosition ] = useState()
  const [ center, setCenter ] = useState({ lat: -27.59, lng: -48.54 })
  const dispatch = useDispatch()

  function onLoad(ref) {
    setSearchBox(ref)
  }

  function addMarker(event) {
    const positionClicked = event.latLng

    const positionX = positionClicked.lat()
    const positionY = positionClicked.lng()
    const locationDesc = ''
    
    setPosition({
      lat: positionX,
      lng: positionY
    })

    handleLocation(positionX, positionY, locationDesc)
  }

  function onPlacesChanged() {
    const places = searchBox.getPlaces()
    const place = places[0]

    const positionX = place.geometry.location.lat() || 0
    const positionY = place.geometry.location.lng() || 0
    const locationDesc = place.formatted_address

    const location = {
      lat: positionX,
      lng: positionY
    }

    setPosition(location)
    setCenter(location)

    handleLocation(positionX, positionY, locationDesc)
  }

  function handleLocation(positionX, positionY, locationDesc) {
    dispatch(changeLocation({
      positionX,
      positionY,
      locationDesc
    }))
  }

  return (
    <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={15}
          onClick={e => addMarker(e)}
          options={{streetViewControl: false}}
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