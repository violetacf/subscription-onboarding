import React from "react";

const FooterLegalLinks: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <a
        href="https://company.gamehouse.com/privacy-statement"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      {" | "}
      <a
        href="https://company.gamehouse.com/privacy-statement"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>
      {" | "}
      <a
        href="https://company.gamehouse.com/privacy-statement"
        target="_blank"
        rel="noopener noreferrer"
      >
        Restore Purchase
      </a>
    </div>
  );
};

export default FooterLegalLinks;
