import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecondComponent from "./SecondComponent";
import FirstComponent from "./FirstComponent";
import "./App.css"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/second" element={<FirstComponent />} />
        <Route path="/" element={<SecondComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
