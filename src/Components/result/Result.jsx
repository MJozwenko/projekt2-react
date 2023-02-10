import "./Result.css";

const Result = ({ finalResult, spinner }) => {
  return (
    <div className="result">
      {spinner ? <div id="spinner"></div> : <p>{finalResult.toFixed(2)} PLN</p>}
    </div>
  );
};

export default Result;
