import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateEmail, sendEmailValidationCode } from "../api/api";

export default function AccountVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailToDisplay = (location.state as { email?: string })?.email;

  const [code, setCode] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextClick = async () => {
    setError(null);
    setLoading(true);

    if (!emailToDisplay || !code) {
      setError(
        "Please ensure you've provided an email and entered the verification code."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await validateEmail(emailToDisplay, code);

      console.log("Email verified successfully! User ID:", response.user_id);
      navigate("/plan", { state: { user_id: response.user_id } });
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
    setResendCooldown(30);

    if (!emailToDisplay) {
      setError("Cannot resend code: Email address is missing.");
      setLoading(false);
      setResendCooldown(0);
      return;
    }

    try {
      await sendEmailValidationCode(emailToDisplay);
      console.log("A new verification code has been sent!");

      const countdownInterval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error("Error resending code:", err);
      setError(err.message || "Failed to resend code. Please try again later.");
      setResendCooldown(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate("/")}>Modify email</button>
        <p> Add list here of benefits </p>
      </div>
      <div>
        <h2>Get Verified!</h2>
        <div>
          {" "}
          <p>Enter the one-time code we sent to:</p>
          <p>{emailToDisplay}</p>
        </div>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <p>Didn't get an email?</p>
          <button
            onClick={handleResendCode}
            disabled={loading || resendCooldown > 0}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: loading || resendCooldown > 0 ? "not-allowed" : "pointer",
              padding: "0",
              font: "inherit",
              opacity: loading || resendCooldown > 0 ? 0.6 : 1,
            }}
          >
            {resendCooldown > 0
              ? `Resend Code (${resendCooldown}s)`
              : "Resend Code"}
          </button>
        </div>
        <button onClick={handleNextClick} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}{" "}
        </button>
      </div>
    </div>
  );
}
