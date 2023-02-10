import "./LogoMain.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

const LogoMain = () => {
  return (
    <div className="logos">
      <div className="logo">
        <FontAwesomeIcon icon={faMoneyBillTransfer} size="8x" />
      </div>
      <div className="title">Przelicznik walut</div>
    </div>
  );
};

export default LogoMain;
