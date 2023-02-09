import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

function App() {
  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/c/")
      .then((data) => data.json())
      .then((data) => {
        const currencies = data[0];
        setCurrency(currencies.rates);
      })
      .catch((err) => console.log(err));
  }, []);

  const [currency, setCurrency] = useState([]);
  const [finalResult, setFinalResult] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState("EUR");
  const [spinner, setSpinner] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const handleButton = () => {
    setSpinner(true);
    fetch("https://api.nbp.pl/api/exchangerates/tables/c/")
      .then((data) => data.json())
      .then((data) => {
        const currencies = data[0];
        const index = currencies.rates.findIndex(
          (rates) => rates.code === selectValue
        );
        setFinalResult(currencies.rates[index].ask * inputValue);
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="conventer">
      <div className="logos">
        <div className="logo">
          <FontAwesomeIcon icon={faMoneyBillTransfer} size="8x" />
        </div>
        <div className="title">Przelicznik walut</div>
      </div>
      <div className="content">
        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={handleInput}
          placeholder="Podaj wartość"
        />
        <select id="select" value={selectValue} onChange={handleSelect}>
          {currency.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
        <button className="btn" onClick={handleButton}>
          Przelicz
        </button>
        <p>TO</p>
        <div className="result">
          {spinner ? (
            <div id="spinner" className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          ) : (
            <p>{finalResult.toFixed(2)} PLN</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
