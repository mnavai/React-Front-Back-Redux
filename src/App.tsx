import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="verifyemail">
          <Route path=":verificationCode" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;