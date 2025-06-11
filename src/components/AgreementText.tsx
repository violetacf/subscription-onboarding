import React from "react";

const AgreementText: React.FC = () => {
  return (
    <p>
      By continuing, you agree to our{" "}
      <a
        href="https://company.gamehouse.com/privacy-statement"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>
      {" and "}
      <a
        href="https://company.gamehouse.com/privacy-statement"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      .
    </p>
  );
};

export default AgreementText;
