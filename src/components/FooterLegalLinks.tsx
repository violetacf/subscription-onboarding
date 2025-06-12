import React from "react";
import Button from "./Button";
import styles from "../styles/components/FooterLegalLinksAndAgreementText.module.css";
import { useNavigate } from "react-router-dom";

const FooterLegalLinks: React.FC = () => {
  const navigate = useNavigate();

  const openLink = () => {
    window.open(
      "https://company.gamehouse.com/privacy-statement",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={styles.footer}>
      <Button
        onClick={() => openLink()}
        variant="link"
        className={styles.footerLink}
      >
        Privacy Policy
      </Button>
      {" | "}
      <Button
        onClick={() => navigate("/not-found")}
        variant="link"
        className={styles.footerLink}
      >
        Terms of Service
      </Button>
      {" | "}
      <Button
        onClick={() => navigate("/not-found")}
        variant="link"
        className={styles.footerLink}
      >
        Restore <span className={styles.hideOnSmall}>Purchase</span>
      </Button>
    </div>
  );
};

export default FooterLegalLinks;
