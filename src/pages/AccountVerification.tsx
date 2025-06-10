import { useNavigate } from "react-router-dom";

export default function AccountVerification() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>
          <p> Add list here of benefits </p>
        </div>
        <h2>Get Verified!</h2>
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate("/plan")}>
          Next: Choose your plan
        </button>
      </div>
    </div>
  );
}
