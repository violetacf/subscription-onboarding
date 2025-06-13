import React, { useState } from "react";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { sendEmailValidationCode } from "../api/api";
import styles from "../styles/components/EmailConnectForm.module.css";

interface EmailConnectFormProps {
  onSuccess: (email: string) => void;
  className?: string;
}

const EmailConnectForm: React.FC<EmailConnectFormProps> = ({
  onSuccess,
  className,
}) => {
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
  };

  return (
    <form
      className={`${styles.formContainer} ${className || ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSendVerificationEmail();
      }}
    >
      <TextInput
        value={email}
        onChange={setEmail}
        placeholder="Email Address"
        disabled={loading}
        type="email"
      />
      {error && <p className={styles.errorText}>{error}</p>}
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
        type="submit"
      >
        {loading ? "Sending..." : "Connect"}
      </Button>
    </form>
  );
};

export default EmailConnectForm;
