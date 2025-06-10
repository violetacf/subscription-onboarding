import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailValidationCode } from "../api/api";

export default function ConnectAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [receiveOffers, setReceiveOffers] = useState<boolean>(false);

  const handleSendVerificationEmail = async () => {
    setError(null);
    setLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await sendEmailValidationCode(email);
      navigate("/verify", { state: { email } });
    } catch (err: any) {
      console.error("Error sending verification email:", err);
      setError(
        err.message || "Failed to send verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <p> Add list here of benefits </p>
      </div>
      <div>
        <h1>Connect Your Account</h1>
        <p>...and unlock your benefits!</p>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>
            <input
              type="checkbox"
              checked={receiveOffers}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setReceiveOffers(isChecked);
                console.log("Receive Offers:", isChecked);
              }}
              disabled={loading}
            />
            Send Me Offers, News, and Fun Stuff!
          </label>
        </div>
        <button onClick={handleSendVerificationEmail} disabled={loading}>
          {loading ? "Sending..." : "Connect"}
          {/* TODO: on click send the true or false for the check even if ignored by backend */}
        </button>
      </div>
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
    </div>
  );
}
