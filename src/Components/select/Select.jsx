import "./Select.css";

const Select = ({ handleSelect, currency, selectValue }) => {
  return (
    <select id="select" value={selectValue} onChange={handleSelect}>
      {currency.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {currency.code}
        </option>
      ))}
    </select>
  );
};

export default Select;
