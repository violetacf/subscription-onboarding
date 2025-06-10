import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, ProductsResponse, Product } from "../api/api";

interface DisplayProduct extends Product {
  id: string;
  name: string;
}

export default function PlanSelection() {
  const navigate = useNavigate();

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

  const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlanId(event.target.value);
  };

  const handleNextClick = () => {
    if (selectedPlanId) {
      navigate("/congrats");
    } else {
      setError("Please select a plan to continue.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/")} disabled={loading}>
        {" < "}
      </button>
      <h2>Choose your plan</h2>
      {loading && <p>Loading plans...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {products && (
        <div>
          {productsArray.map((plan) => (
            <div key={plan.id} onClick={() => setSelectedPlanId(plan.id)}>
              <label>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  checked={selectedPlanId === plan.id}
                  onChange={handlePlanChange}
                />
                {/* TODO: https://www.npmjs.com/package/currency-formatter to format $ instead of USD */}
                <div>
                  <h3>{plan.id === "monthly" ? "Monthly" : "Annual"}</h3>
                  <p>
                    {plan.price} {plan.currency}/
                    {plan.id === "monthly" ? "month" : "year"}
                  </p>
                  <p>Billed {plan.id === "monthly" ? "monthly" : "annually"}</p>
                  <p>{plan.trial_days}-day free trial</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
      <p>Cancel anytime.</p>
      <button onClick={handleNextClick} disabled={loading || !selectedPlanId}>
        Start my free trial!
      </button>
      <div>
        <a
          href="https://company.gamehouse.com/privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        {" | "}
        <a
          href="https://company.gamehouse.com/privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        {" | "}
        <a
          href="https://company.gamehouse.com/privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          Restore Purchase
        </a>
      </div>
    </div>
  );
}
