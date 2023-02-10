import "./App.css";
import LogoMain from "./Components/logo/LogoMain";
import Input from "./Components/input/Input";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/c/")
      .then((data) => data.json())
      .then((data) => {
        const currencies = data[0];
        setCurrency(
          currencies.rates.filter(
            (currency) =>
              currency.code === "EUR" ||
              currency.code === "USD" ||
              currency.code === "CHF"
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const [currency, setCurrency] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [finalResult, setFinalResult] = useState(0);
  const [selectValue, setSelectValue] = useState("EUR");
  const [spinner, setSpinner] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (e.target.value < 0) {
      setInputValue(e.target.value * -1);
    }
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
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <div className="conventer">
      <LogoMain />
      <div className="content">
        <Input handleInput={handleInput} inputValue={inputValue} />
        <div className="content">
          <select id="select" value={selectValue} setInputValue={handleSelect}>
            {currency.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </div>
        <button className="btn" onClick={handleButton}>
          Przelicz
        </button>
        <p>TO</p>
        <div className="result">
          {spinner ? (
            <div id="spinner" className="spinner-border" role="status"></div>
          ) : (
            <p>{finalResult.toFixed(2)} PLN</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
