import React, { useState } from "react";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { sendEmailValidationCode } from "../api/api";

interface EmailConnectFormProps {
  onSuccess: (email: string) => void;
}

const EmailConnectForm: React.FC<EmailConnectFormProps> = ({ onSuccess }) => {
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
      await sendEmailValidationCode(email, receiveOffers);
      onSuccess(email);
    } catch (err: any) {
      console.error("Error sending verification email:", err);
      setError(
        err.message || "Failed to send verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReceiveOffersChange = (isChecked: boolean) => {
    setReceiveOffers(isChecked);
    // console.log("Receive Offers:", isChecked);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <TextInput
        value={email}
        onChange={setEmail}
        placeholder="Email Address"
        disabled={loading}
        type="email"
      />
      {error && (
        <p style={{ color: "red", textAlign: "center", width: "100%" }}>
          {error}
        </p>
      )}
      <Checkbox
        label="Send Me Offers, News, and Fun Stuff!"
        checked={receiveOffers}
        onChange={handleReceiveOffersChange}
        disabled={loading}
      />
      <Button
        onClick={handleSendVerificationEmail}
        disabled={loading}
        variant="primary"
        color="#8a2be2"
      >
        {loading ? "Sending..." : "Connect"}
      </Button>
    </div>
  );
};

export default EmailConnectForm;
