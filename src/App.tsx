import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { connect } from "./components/contractFunction/initFunction";

import Dashboard from "./pages/Dashboard";
import Voting from "./pages/Voting";
import VotingForm from "./pages/VotingForm";
import VotingDetail from "./pages/VotingDetail";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <div className="flex justify-center mb-10">
        <button
          className="button bg-gray-400 p-2 rounded-xl mx-2 text-white"
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>
        <button
          className="button bg-gray-400 p-2 rounded-xl mx-2 text-white"
          onClick={() => navigate("/voting")}
        >
          Votings
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/voting/:votingId" element={<VotingDetail />} />
        <Route path="/voting/form" element={<VotingForm />} />
      </Routes>
    </>
  );
}

export default App;
