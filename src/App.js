import "./App.css";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/c/")
      .then((data) => data.json())
      .then((data) => {
        const currencies = data[0];
        const currencyNames = currencies.rates.map((rate) => rate.code);
        setCurrencyNames(currencyNames);
      })
      .catch((err) => console.log(err));
  }, []);

  const [currencyNames, setCurrencyNames] = useState([]);
  const [currency, setCurrency] = useState("PLN");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  const handleSelect = (e) => {
    setCurrency(e.target.value);
  };

  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  const handleButton = () => {
    fetch(`https://api.nbp.pl/api/exchangerates/rates/c/`)
      .then((data) => data.json())
      .then((data) => {
        const rate = data.rates[0].mid;
        setResult(rate * amount);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exchange rate calculator</h1>
        <div className="container">
          <div className="input">
            <input type="number" onChange={handleInput} />
            <select onChange={handleSelect}>
              {currencyNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn" onClick={handleButton}>
            Calculate
          </button>
          <div className="result">
            {result.toFixed(2)} {currency}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
