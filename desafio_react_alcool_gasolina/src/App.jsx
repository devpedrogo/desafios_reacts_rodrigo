import { useState } from 'react'
import imagemBomba from './assets/bomba-de-combustivel.png'
import './App.css'

function App() {
  const [alcool, setAlcool] = useState('')
  const [gasolina, setGasolina] = useState('')
  const [resultado, setResultado] = useState('')

  function calcularMelhorCombustivel(evento) {
    evento.preventDefault()

    const precoAlcool = Number(alcool.replace(',', '.'))
    const precoGasolina = Number(gasolina.replace(',', '.'))

    if (
      !Number.isFinite(precoAlcool) ||
      !Number.isFinite(precoGasolina) ||
      precoAlcool <= 0 ||
      precoGasolina <= 0
    ) {
      setResultado('Informe valores maiores que zero.')
      return
    }

    setResultado(
      precoAlcool / precoGasolina < 0.7
        ? 'É mais vantajoso abastecer com álcool.'
        : 'É mais vantajoso abastecer com gasolina.',
    )
  }

  return (
    <main className="calculadora">
      <img className="imagem-bomba" src={imagemBomba} width="170" height="179" alt="Bomba de combustível" />
      <h1>Qual a melhor opção?</h1>
      <form onSubmit={calcularMelhorCombustivel}>
        <label htmlFor="alcool">Álcool (preço por litro):</label>
        <input
          id="alcool"
          type="text"
          inputMode="decimal"
          value={alcool}
          onChange={(evento) => setAlcool(evento.target.value)}
          required
        />
        <label htmlFor="gasolina">Gasolina (preço por litro):</label>
        <input
          id="gasolina"
          type="text"
          inputMode="decimal"
          value={gasolina}
          onChange={(evento) => setGasolina(evento.target.value)}
          required
        />
        <button type="submit">Calcular</button>
      </form>
      {resultado && <p id="resultado" role="status">{resultado}</p>}
    </main>
  )
}

export default App
