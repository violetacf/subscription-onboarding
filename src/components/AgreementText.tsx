import React from "react";
import Button from "./Button";
import styles from "../styles/components/FooterLegalLinksAndAgreementText.module.css";
import { useNavigate } from "react-router-dom";

const AgreementText: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.agreementTextWrapper}>
      <p className={styles.agreementText}>
        By continuing, you agree to our{" "}
        <Button
          onClick={() => navigate("/not-found")}
          variant="link"
          className={styles.agreementLink}
        >
          Terms of Service
        </Button>
        {" and "}
        <Button
          onClick={() => navigate("/not-found")}
          variant="link"
          className={styles.agreementLink}
        >
          Privacy Policy
        </Button>
        .
      </p>
    </div>
  );
};

export default AgreementText;
