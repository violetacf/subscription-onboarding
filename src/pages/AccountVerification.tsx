import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Benefits from "../components/Benefits";
import Button from "../components/Button";
import VerificationCodeForm from "../components/VerificationCodeForm";
import styles from "../styles/pages/AccountVerification.module.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function AccountVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailToDisplay = (location.state as { email?: string })?.email;
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!emailToDisplay) {
      navigate("/");
    }
  }, [emailToDisplay, navigate]);

  const handleVerificationSuccess = (userId: number) => {
    setPageLoading(true);
    navigate("/plan", { state: { user_id: userId } });
  };

  const handleResendInitiated = () => {
    setPageLoading(true);
  };

  const handleResendComplete = (error: string | null) => {
    setPageLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() => navigate("/")}
          disabled={pageLoading}
          variant="back"
          className={styles.backButton}
          icon={faArrowLeft}
        >
          Modify email
        </Button>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.headingBlock}>
          <h1>Get Verified!</h1>
          <p>Enter the one time code we sent to:</p>
          {emailToDisplay ? (
            <p className={styles.emailToDisplay}>{emailToDisplay}</p>
          ) : (
            <p className={styles.loadingText}>Loading email...</p>
          )}
        </div>

        <Benefits className={styles.benefitsBlock} />

        {emailToDisplay && (
          <VerificationCodeForm
            email={emailToDisplay}
            onVerified={handleVerificationSuccess}
            onResendInitiated={handleResendInitiated}
            onResendComplete={handleResendComplete}
            isPageLoading={pageLoading}
            className={styles.formBlock}
          />
        )}
      </div>
    </div>
  );
}
