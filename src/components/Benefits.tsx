import styles from "../styles/components/Benefits.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface BenefitItem {
  id: string;
  text: string;
}

const benefitsData: BenefitItem[] = [
  {
    id: "games",
    text: "Access to 100+ GAMES for FREE thanks to ads",
  },
  {
    id: "login",
    text: "Log In Across All Your Devices",
  },
  {
    id: "support",
    text: "Skip the Line with Customer Support",
  },
];

interface BenefitsProps {
  className?: string;
}

export default function Benefits({ className }: BenefitsProps) {
  return (
    <div className={`${styles.benefitsContainer} ${className || ""}`}>
      {benefitsData.map((benefit) => (
        <div key={benefit.id} className={styles.benefitItem}>
          <div className={styles.checkCircleIcon}>
            <FontAwesomeIcon icon={faCheck} className={styles.benefitIcon} />
          </div>
          <p>{benefit.text}</p>
        </div>
      ))}
    </div>
  );
}
