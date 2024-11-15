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
import { Toaster } from "react-hot-toast";
// import NotFound from "./pages/NotFound/NotFound";

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
          <Route path="create-proposal" element={<CreateProposal />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="voters" element={<Voters />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
