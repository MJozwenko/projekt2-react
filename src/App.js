import "./App.css";
import LogoMain from "./Components/logo/LogoMain";
import Input from "./Components/input/Input";
import Select from "./Components/select/Select";
import Button from "./Components/button/Button";
import Result from "./Components/result/Result";
import { useEffect, useState } from "react";
import { fetchCurrencies } from "./Components/fetch/Fetch";

function App() {
  const [currency, setCurrency] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [finalResult, setFinalResult] = useState(0);
  const [selectValue, setSelectValue] = useState("EUR");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    fetchCurrencies(setSelectValue)
      .then((data) => {
        setCurrency(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    fetchCurrencies(setSelectValue)
      .then((data) => {
        setCurrency(data);
        const index = data.findIndex((rates) => rates.code === selectValue);

        setFinalResult(inputValue * data[index].ask);
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
        <Select
          handleSelect={handleSelect}
          currency={currency}
          selectValue={selectValue}
        />
        <Button handleButton={handleButton} />
        <p>TO</p>
        <Result finalResult={finalResult} spinner={spinner} />
      </div>
    </div>
  );
}

export default App;
