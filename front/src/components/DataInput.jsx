import '../styles/components/datainput.sass';

const DataInput = () => {
  return (
    <div className="data-container">
      <div className="input">
        <label className="inp" id="field1">
          <input type="text" id="field1" />
          <span className="label">field1</span>
          <span className="focus-bg"></span>
        </label>
        <label className="inp" id="field2">
          <input type="text" id="field2" />
          <span className="label">field2</span>
          <span className="focus-bg"></span>
        </label>
        <label className="inp" id="field3">
          <input type="text" id="field3" />
          <span className="label">field3</span>
          <span className="focus-bg"></span>
        </label>
        <label className="inp" id="field4">
          <input type="text" id="field4" />
          <span className="label">field4</span>
          <span className="focus-bg"></span>
        </label>
        <label className="inp" id="field5">
          <input type="text" id="field5" />
          <span className="label">field5</span>
          <span className="focus-bg"></span>
        </label>
        <label className="inp" id="field6">
          <input type="text" id="field6" />
          <span className="label">field6</span>
          <span className="focus-bg"></span>
        </label>
      </div>
      <div className="send-container">
        <button className="btn-send">Enviar</button>
      </div>
    </div>
  )
}

export default DataInput;