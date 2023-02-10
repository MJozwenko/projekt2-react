import "./Input.css";

const Input = ({ inputValue, handleInput }) => {
  return (
    <div className="input">
      <input
        type="number"
        min="0"
        value={inputValue}
        onChange={handleInput}
        placeholder="Podaj wartość"
      />
    </div>
  );
};

export default Input;
