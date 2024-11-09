import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "@pages/Home/Home";

import Home from "./pages/Home/Home";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateVoter from "./pages/CreateVoter/CreateVoter";
import Proposals from "./pages/Proposals/Proposals";
import Voters from "./pages/Voters/Voters";
import CreateProposal from "./pages/CreateProposal/CreateProposal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-voter" element={<CreateVoter />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="create-proposal" element={<CreateProposal />} />
          <Route path="voters" element={<Voters />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
