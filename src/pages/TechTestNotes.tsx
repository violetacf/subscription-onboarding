import { useNavigate } from "react-router-dom";

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
      </ol>

      <hr />

      <p>
        In case you want to check again one of the pages, use the buttons below:
      </p>

      <button onClick={() => navigate("/")}>Connect Your Account</button>
      <button onClick={() => navigate("/verify")}>Get Verified!</button>
      <button onClick={() => navigate("/plan")}>Choose your plan</button>
      <button onClick={() => navigate("/congrats")}>
        Congrats! Subscriber
      </button>
      <button onClick={() => navigate("/")}>Start Over</button>
    </div>
  );
}
