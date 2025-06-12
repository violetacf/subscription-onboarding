import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "../styles/pages/NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Button
        onClick={() => navigate(-1)}
        variant="back"
        className={styles.backButton}
        icon={faChevronLeft}
      />
      <DotLottieReact
        src="https://lottie.host/288e2226-a7f4-4a80-8113-e5b9fb9a373e/63sGn1xykp.lottie"
        loop
        autoplay
      />
    </div>
  );
}
