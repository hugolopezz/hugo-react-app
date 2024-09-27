// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyProvider } from "./context/myProvider";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import RedirectRoute from "./components/RedirectRoute/RedirectRoute";

import "./styles.css";

const App: React.FC = () => {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={<RedirectRoute element={<Dashboard />} isProtected={true} />} 
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/"
            element={<RedirectRoute element={<LoginPage />} isProtected={false} />} 
          />
          <Route
            path="/login"
            element={<RedirectRoute element={<LoginPage />} isProtected={false} />}
          />
        </Routes>
      </Router>
    </MyProvider>
  );
};

export default App;
