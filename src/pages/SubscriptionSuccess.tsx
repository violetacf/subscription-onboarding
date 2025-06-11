import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Congrats! You're now a subscriber!</h2>
      <p>Explore your membership now.</p>
      <hr />
      <Button
        onClick={() => navigate("/tech-test-notes")}
        variant="primary"
        color="#8a2be2"
      >
        View Tech Test Notes
      </Button>
    </div>
  );
}
