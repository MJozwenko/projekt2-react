import "./Button.css";

const Button = ({ handleButton }) => {
  return (
    <button className="btn" onClick={handleButton}>
      Przelicz
    </button>
  );
};

export default Button;
