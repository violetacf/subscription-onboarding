import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import FooterLegalLinks from "../components/FooterLegalLinks";
import SubscriptionPlanForm from "../components/SubscriptionPlanForm";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/pages/PlanSelection.module.css";

export default function PlanSelection() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const handlePlanSelectionProceed = (selectedPlanId: string) => {
    setPageLoading(true);
    navigate("/congrats", { state: { selectedPlanId } });
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={() => navigate("/")}
        disabled={pageLoading}
        variant="back"
        className={styles.backButton}
        icon={faChevronLeft}
      />
      <SubscriptionPlanForm
        onPlanSelectedAndProceed={handlePlanSelectionProceed}
        isPageLoading={pageLoading}
      />
      <FooterLegalLinks />
    </div>
  );
}
