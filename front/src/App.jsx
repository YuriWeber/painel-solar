import { useSelector } from "react-redux";
import DataInput from "./components/DataInput";
import MapViewer from "./components/MapViewer";
import Result from "./components/Result";

import './styles/components/app.sass'

function App() {
  const { showResult } = useSelector(state => state.result)

  return (
    <div className="app">
      <main className="main-content">
        <h1>Economiza Solar</h1>
        <DataInput />
        <MapViewer />
      </main>
      {
      showResult 
      ? <div className="data-result"><Result /></div>
      : <></>
      }
      
    </div>
  )
}

export default App
