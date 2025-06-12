import React from "react";
import Button from "./Button";
import styles from "../styles/components/FooterLegalLinksAndAgreementText.module.css";

const FooterLegalLinks: React.FC = () => {
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
        onClick={() => openLink()}
        variant="link"
        className={styles.footerLink}
      >
        Terms of Service
      </Button>
      {" | "}
      <Button
        onClick={() => openLink()}
        variant="link"
        className={styles.footerLink}
      >
        Restore <span className={styles.hideOnSmall}>Purchase</span>
      </Button>
    </div>
  );
};

export default FooterLegalLinks;
