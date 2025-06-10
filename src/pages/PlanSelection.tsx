import { useNavigate } from "react-router-dom";

export default function PlanSelection() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Choose your plan</h2>
      <button onClick={() => navigate("/verify")}>Back</button>
      <button onClick={() => navigate("/congrats")}>Next: Congrats!</button>
    </div>
  );
}
