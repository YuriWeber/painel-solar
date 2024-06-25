import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeShowResult } from '../redux/resultSlice';
import { changeData } from '../redux/dataSlice';
import axios from 'axios';

import '../styles/components/datainput.sass';

const api = axios.create({
  baseURL: import.meta.env.VITE_ECONOMIZA_SOLAR_API_URL
})

const DataInput = () => {
  const [ monthlyConsumption, setMonthlyConsumption ] = useState('')
  const [ kwhValue, setKwhValue ] = useState('')
  const [ limitedArea, setLimitedArea ] = useState('')
  const [ checkLimitedArea, setCheckLimitedArea ] = useState(false)
  const [ searching, setSearching ]  = useState(false)

  const location = useSelector(state => state.location)
  
  const dispatch = useDispatch()
  
  async function handleSendClick() {
    try {
      setSearching(true)
      await api.get('/', {
        params: {
          monthlyConsumption,
          kwhValue,
          limitedArea: checkLimitedArea ? limitedArea : null,
          lat: location.lat,
          lng: location.lng
        }
      }).then(res => {
        dispatch(changeShowResult(true))
        dispatch(changeData(res.data))
      }).catch(err => {
        dispatch(changeShowError(false))
        dispatch(changeData({
          monthlyProduction: 0,
          yearlyProduction: 0,
          kwhValue: 0,
          weight: 0,
          requiredArea: 0
        }))
      }).finally(() => {
        setSearching(false)
      })
    } catch (error) {
      
    } finally {
      
    }
  }

  function handleMonthlyConsumption(event) {
    const regex = new RegExp("^$|(?<=^| )\\d+(\\.)?(\\d+)?(?=$| )|(?<=^| )\\.\\d+(?=$| )")
    const { value } = event.target
    setMonthlyConsumption(state => regex.test(value) ? value : state)
  }

  function handleKwhValue(event) {
    const regex = new RegExp("^$|(?<=^| )\\d+(\\.)?(\\d+)?(?=$| )|(?<=^| )\\.\\d+(?=$| )")
    const { value } = event.target
    setKwhValue(state => regex.test(value) ? value : state)
  }

  function handleLimitedArea(event) {
    const regex = new RegExp("^[0-9]*$")
    const { value } = event.target
    setLimitedArea(state => regex.test(value) ? value : state)
  }

  return (
    <div className="data-container">
      <div className="input">
        <div className="inp">
          <input 
            type="text"
            id="monthly-consumption" 
            value={monthlyConsumption}
            onChange={handleMonthlyConsumption}
            maxLength="10"
          />
          <label htmlFor="monthly-consumption" className="label">Consumo Mensal (kWh)</label>
          <span className="focus-bg"></span>
        </div>
        <div className="inp">
          <input 
            type="text" 
            id="kwh-value" 
            value={kwhValue}
            onChange={handleKwhValue}
            maxLength="10"
          />
          <label htmlFor="kwh-value" className="label">Valor do kWh (R$)</label>
          <span className="focus-bg"></span>
        </div>
        <div className="switch">
          <input type="checkbox" id="checkbox" onChange={() => setCheckLimitedArea(state => !state)} />
          <label htmlFor="checkbox"></label>
          <span htmlFor="checkbox">Limitar área disponível</span>
        </div>
        {checkLimitedArea && 
          <div className="inp">
            <input 
              type="text" 
              id="kwh-value" 
              value={limitedArea}
              onChange={handleLimitedArea}
              maxLength="10"
            />
            <label htmlFor="kwh-value" className="label">Área limite (m²)</label>
            <span className="focus-bg"></span>
          </div>
        }
        {location.lat != null &&
          <div className='address-container'>
            {location.description != null && location.description.length > 0 && 
              <span className='address'>Endereço: {location.description}</span>
            }
            <br/>
            <span>Posição: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
          </div>
        }
      </div>
      <div className="send-container">
        {searching ? 
          <button className="searching" onClick={handleSendClick} disabled={true}>Consultando...</button>
          :
          <button className="btn-send" onClick={handleSendClick}>Consultar</button>
        }
      </div>
    </div>
  )
}

export default DataInput;