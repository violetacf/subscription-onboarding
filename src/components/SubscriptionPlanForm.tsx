import React, { useState, useEffect } from "react";
import { getProducts, ProductsResponse, Product } from "../api/api";
import RadioOption from "./RadioOption";
import Button from "./Button";
import styles from "../styles/pages/SubscriptionPlanForm.module.css";

interface DisplayProduct extends Product {
  id: string;
  name: string;
}

interface SubscriptionPlanFormProps {
  onPlanSelectedAndProceed: (selectedPlanId: string) => void;
  isPageLoading?: boolean;
}

const SubscriptionPlanForm: React.FC<SubscriptionPlanFormProps> = ({
  onPlanSelectedAndProceed,
  isPageLoading = false,
}) => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsArray: DisplayProduct[] = products
    ? Object.keys(products).map((key) => {
        const planDetails = products[key as keyof ProductsResponse];
        const friendlyName = key.charAt(0).toUpperCase() + key.slice(1);
        return {
          id: key,
          name: friendlyName,
          ...planDetails,
        };
      })
    : [];

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    if (error) setError(null);
  };

  const handleSubmit = () => {
    if (selectedPlanId) {
      onPlanSelectedAndProceed(selectedPlanId);
    } else {
      setError("Please select a plan to continue.");
    }
  };

  const isDisabled = loading || isPageLoading;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h1>Choose your plan</h1>
      {loading && <p>Loading plans...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {products && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {productsArray.map((plan) => (
            <RadioOption
              key={plan.id}
              value={plan.id}
              checked={selectedPlanId === plan.id}
              onChange={handlePlanChange}
              name="plan"
              disabled={isDisabled}
              label={
                <div className={styles.planContent}>
                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>
                      {plan.name === "Monthly" ? "Monthly" : "Annual"}
                    </h3>
                    {plan.name !== "Monthly" && (
                      <span className={styles.hideOnBig}>BEST VALUE</span>
                    )}
                  </div>
                  <div className={styles.planDetails}>
                    <p className={styles.planPrice}>
                      {plan.price} {plan.currency}/
                      {plan.name === "Monthly" ? "month" : "year"}
                    </p>
                    <p className={styles.planBilled}>
                      Billed {plan.name === "Monthly" ? "monthly" : "annually"}
                    </p>
                    <p className={styles.planTrial}>
                      {plan.trial_days}-day free trial
                    </p>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}
      <p className={styles.cancelAnytime}>Cancel anytime.</p>
      <Button
        onClick={handleSubmit}
        disabled={isDisabled || !selectedPlanId}
        variant="secondary"
        className={styles.trialButton}
      >
        Start my free trial!
      </Button>
    </div>
  );
};

export default SubscriptionPlanForm;
