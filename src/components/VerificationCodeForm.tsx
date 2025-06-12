import React, { useState, useEffect } from "react";
import CodeInput from "./CodeInput";
import Button from "./Button";
import { validateEmail, sendEmailValidationCode } from "../api/api";
import styles from "./../styles/components/VerificationCodeForm.module.css";

interface VerificationCodeFormProps {
  email: string;
  onVerified: (userId: number) => void;
  onResendInitiated?: () => void;
  onResendComplete?: (error: string | null) => void;
  isPageLoading?: boolean;
  className?: string;
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  email,
  onVerified,
  onResendInitiated,
  onResendComplete,
  isPageLoading = false,
  className,
}) => {
  const [code, setCode] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleVerifyCode = async () => {
    setError(null);
    setLoading(true);

    if (!email) {
      setError("Email address is missing. Please contact support.");
      setLoading(false);
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
      setLoading(false);
      return;
    }

    try {
      const response = await validateEmail(email, code);
      console.log("Email verified successfully! User ID:", response.user_id);
      onVerified(response.user_id);
    } catch (err: any) {
      console.error("Error verifying account:", err);
      setError(
        err.message || "Failed to verify account. Please check your code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setLoading(true);
    onResendInitiated?.();
    setResendCooldown(30);

    if (!email) {
      setError("Cannot resend code: Email address is missing.");
      setLoading(false);
      setResendCooldown(0);
      onResendComplete?.("Email address is missing.");
      return;
    }

    try {
      await sendEmailValidationCode(email);
      console.log("A new verification code has been sent!");
      onResendComplete?.(null);
    } catch (err: any) {
      console.error("Error resending code:", err);
      setError(err.message || "Failed to resend code. Please try again later.");
      setResendCooldown(0);
      onResendComplete?.(err.message || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || isPageLoading;

  return (
    <form
      className={`${styles.container} ${className || ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleVerifyCode();
      }}
    >
      <CodeInput
        length={6}
        onComplete={setCode}
        onChange={setCode}
        disabled={isDisabled}
      />
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.resendSection}>
        <p className={styles.resendText}>Didn't get an email?</p>
        <Button
          onClick={handleResendCode}
          disabled={isDisabled || resendCooldown > 0}
          variant="link"
          className={styles.resendButton}
        >
          {resendCooldown > 0
            ? `Resend Code (${resendCooldown}s)`
            : "Resend Code"}
        </Button>
      </div>
      <Button
        type="submit"
        onClick={handleVerifyCode}
        disabled={isDisabled || code.length !== 6}
        variant="primary"
        className={styles.verifyButton}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};

export default VerificationCodeForm;
