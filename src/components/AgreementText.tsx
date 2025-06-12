import React from "react";
import Button from "./Button";
import styles from "../styles/components/FooterLegalLinksAndAgreementText.module.css";

const AgreementText: React.FC = () => {
  const openLink = () => {
    window.open(
      "https://company.gamehouse.com/privacy-statement",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={styles.agreementTextWrapper}>
      <p className={styles.agreementText}>
        By continuing, you agree to our{" "}
        <Button
          onClick={() => openLink()}
          variant="link"
          className={styles.agreementLink}
        >
          Terms of Service
        </Button>
        {" and "}
        <Button
          onClick={() => openLink()}
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
