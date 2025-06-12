import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/pages/TechTestNotes.module.css";

export default function TechTestNotes() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tech Test Notes</h1>
      <p>
        Thank you for taking the time to look at my work, I have enjoyed working
        on this project
      </p>
      <ol className={styles.list}>
        <li>Created the React app</li>
        <li>
          Organized the project structure with folders:
          <ul className={styles.subList}>
            <li>
              <b>api/</b> for api calls
            </li>
            <li>
              <b>components/</b> for components
            </li>
            <li>
              <b>pages/</b> for route-level components (happy path steps)
            </li>
            <li>
              <b>styles/</b> for component and pages styles
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
        <li>Extracted different components to their own files</li>
        <li>Finally the most fun: worked on styling!</li>
      </ol>

      <hr />

      <p>
        In case you want to check again one of the pages, use the buttons below:
      </p>

      <div className={styles.buttonGroup}>
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
        <Button onClick={() => navigate("/not-found")} variant="primary">
          Not Found
        </Button>
      </div>
    </div>
  );
}
