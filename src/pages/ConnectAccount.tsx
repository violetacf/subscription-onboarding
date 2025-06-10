import { useNavigate } from "react-router-dom";

export default function ConnectAccount() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <p> Add list here of benefits </p>
      </div>
      <div>
        <h1>Connect Your Account</h1>
        <input type="text" />
        <button onClick={() => navigate("/verify")}>Next: Get Verified!</button>
      </div>
    </div>
  );
}
