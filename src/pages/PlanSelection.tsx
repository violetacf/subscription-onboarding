import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import FooterLegalLinks from "../components/FooterLegalLinks";
import SubscriptionPlanForm from "../components/SubscriptionPlanForm";

export default function PlanSelection() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const handlePlanSelectionProceed = (selectedPlanId: string) => {
    setPageLoading(true);
    navigate("/congrats", { state: { selectedPlanId } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "40px",
        margin: "0 auto",
      }}
    >
      <Button
        onClick={() => navigate("/")}
        disabled={pageLoading}
        variant="secondary"
        style={{ alignSelf: "flex-start" }}
      >
        {" < "}
      </Button>
      <SubscriptionPlanForm
        onPlanSelectedAndProceed={handlePlanSelectionProceed}
        isPageLoading={pageLoading}
      />
      <FooterLegalLinks />
    </div>
  );
}
