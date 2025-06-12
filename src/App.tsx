import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ConnectAccount from "./pages/ConnectAccount";
import AccountVerification from "./pages/AccountVerification";
import PlanSelection from "./pages/PlanSelection";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import TechTestNotes from "./pages/TechTestNotes";
import NotFound from "./pages/NotFound";

library.add(fas);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ConnectAccount />} />
          <Route path="/verify" element={<AccountVerification />} />
          <Route path="/plan" element={<PlanSelection />} />
          <Route path="/congrats" element={<SubscriptionSuccess />} />
          <Route path="/tech-test-notes" element={<TechTestNotes />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
