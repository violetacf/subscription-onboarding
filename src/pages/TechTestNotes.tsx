import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function TechTestNotes() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Tech Test Notes</h1>
      <ol>
        <li>Created the React app.</li>
        <li>
          Organized the project structure with folders:
          <ul>
            <li>
              <b>pages/</b> for route-level components (happy path steps)
            </li>
          </ul>
        </li>
        <li>
          Created mock routes in <code>App.tsx</code> for the subscription steps
          and Tech Test Notes page.
        </li>
        <li>Added the server.js file and tested out the api in postman</li>
        <li>
          Implemented api calls in ConnectAccount, AccountVerification,
          PlanSelection, SubscriptionSuccess and all the fields needed according
          to the requirements
        </li>
        <li>Extract different components to their own files</li>
      </ol>

      <hr />

      <p>
        In case you want to check again one of the pages, use the buttons below:
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        <Button onClick={() => navigate("/")} variant="primary">
          Connect Your Account
        </Button>
        <Button onClick={() => navigate("/verify")} variant="primary">
          Get Verified!
        </Button>
        <Button onClick={() => navigate("/plan")} variant="primary">
          Choose your plan
        </Button>
        <Button onClick={() => navigate("/congrats")} variant="primary">
          Congrats! You're now a subscriber!
        </Button>
      </div>
    </div>
  );
}
