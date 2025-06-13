import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/pages/SubscriptionSuccess.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className={styles.congratsText}>
        Congrats! You're now a{" "}
        <span className={styles.subscriberHighlight}>subscriber</span>!
      </h2>
      <p>Explore your membership now.</p>
      <DotLottieReact
        src="https://lottie.host/bf15bc66-062d-4245-af75-ca96dec1ec56/O8CbcuDf0C.lottie"
        loop
        autoplay
        className={styles.backgroundAnimation}
      />
      <Button onClick={() => navigate("/tech-test-notes")} variant="primary">
        View Tech Test Notes
      </Button>
    </div>
  );
}
