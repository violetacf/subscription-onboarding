import { useNavigate } from "react-router-dom";

export default function SubscriptionSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Congrats! You're now a subscriber!</h2>
      <p>Explore your membership now.</p>
      <hr />
      <button onClick={() => navigate("/tech-test-notes")}>
        View Tech Test Notes
      </button>
    </div>
  );
}
