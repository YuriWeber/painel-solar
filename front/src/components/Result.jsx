import '../styles/components/result.sass'
import { useSelector } from 'react-redux';

const Result = () => {
  const result = useSelector(state => state.data)

  return (
    <div className="result-container">
      <h1 className='result-title'>Resultado</h1>
      <div className='result'>
        <div>
          <h3>Produção Mensal</h3>
          <span>{result.monthlyProduction.toFixed(2)} {result.monthlyProduction > 0 && "kWh"}</span>
        </div>
        <div>
          <h3>Produção Anual</h3>
          <span>{result.yearlyProduction.toFixed(2)} {result.yearlyProduction > 0 && "kWh"}</span>
        </div>
        <div>
          <h3>Economia Anual</h3>
          <span>{result.estimatedSavings > 0 && "R$"} {result.estimatedSavings.toFixed(2)}</span>
        </div>
        <div>
          <h3>Peso</h3>
          <span>{result.weight} {result.weight > 0 && "Kg"}</span>
        </div>
        <div>
          <h3>Área requerida</h3>
          <span>{result.requiredArea} {result.requiredArea > 0 && "m²"}</span>
        </div>
      </div>
    </div>
  )
}

export default Result;