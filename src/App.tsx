import { useState, type FormEvent } from 'react'
import './App.css'

import logoImg from './assets/calc.png'

/*
  Calculo: Juros Simples
  Juros * Taxa * Tempo
  Montante = capital + juros
*/
interface InfoProps{
  title: string;
  capital: string | number;
  taxa: string | number;
  tempo: string | number;
  juros: string | number;
  montante: string | number;
}


function App() {
  const [capitalInput, setCapitalInput] = useState(0)
  const [taxaInput, setTaxaInput] = useState(0)
  const [tempoInput, setTempoInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault();

  const capital = Number(capitalInput);
  const taxa = Number(taxaInput);
  const tempo = Number(tempoInput);

  if (!capital || !taxa || !tempo) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const juros = capital * (taxa / 100) * tempo;
  const montante = capital + juros;

  console.log("Juros:", juros);
  console.log("Montante Final:", montante);

  setInfo({
    title: "Resultado do Cálculo de Juros Simples",
    capital: formatarMoeda(capital),
    taxa: `${taxa}% ao mês`,
    tempo: `${tempo} meses`, 
    juros: formatarMoeda(juros),
    montante: formatarMoeda(montante),
  });
}

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img
          className="logo"
          src={logoImg}
          alt="Logo do calculo de juros simples"
        />
        <h1 className="title">Qual melhor opção de juros?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Capital: (Quanto você quer investir?):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={capitalInput}
            onChange={ (e) => setCapitalInput(Number(e.target.value)) }

          />

          <label>Taxa (Qual a taxa de juros?):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            step="0.01"
            required
            value={taxaInput}
            onChange={ (e) => setTaxaInput(Number(e.target.value)) }
          />

          <label>Tempo (Quanto tempo?):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            required
            value={tempoInput}
            onChange={ (e) => setTempoInput(Number(e.target.value)) }
          />

          <input className="button"  type="submit" value="Calcular"/>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">
              {info.title}
            </h2>
          </section>
        )}

      </main>
    </div>
  )
}

export default App