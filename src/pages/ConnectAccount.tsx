import { useNavigate } from "react-router-dom";
import Benefits from "../components/Benefits";
import AgreementText from "../components/AgreementText";
import EmailConnectForm from "../components/EmailConnectForm";
import styles from "../styles/ConnectAccount.module.css";

export default function ConnectAccount() {
  const navigate = useNavigate();

  const handleConnectSuccess = (email: string) => {
    navigate("/verify", { state: { email } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.connectHeading}>
        <h1>Connect Your Account</h1>
        <p>...and unlock your benefits!</p>
      </div>

      <div className={styles.benefitsWrapper}>
        <Benefits />
      </div>

      <div className={styles.emailFormWrapper}>
        <EmailConnectForm onSuccess={handleConnectSuccess} />
      </div>

      <div className={styles.agreementTextWrapper}>
        <AgreementText />
      </div>
    </div>
  );
}
