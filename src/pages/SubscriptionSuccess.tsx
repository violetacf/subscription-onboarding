import { useNavigate } from "react-router-dom";

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Congrats! You are now a subscriber!</h2>
      <button onClick={() => navigate("/plan")}>Back</button>
      <button onClick={() => navigate("/")}>Start over</button>
      <hr />
      <button onClick={() => navigate("/tech-test-notes")}>
        View Tech Test Notes
      </button>
    </div>
  );
}
