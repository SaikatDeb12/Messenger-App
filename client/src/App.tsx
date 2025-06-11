import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Callback from "./components/Callback";
import Home from "../src/pages/home/page";
import ProtectedRoute from "../src/pages/home/components/ProtectedRoute";
import Index from "./pages/index/page";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Index />} />
        {/* <Route path="/callback" element={<Callback />} /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
