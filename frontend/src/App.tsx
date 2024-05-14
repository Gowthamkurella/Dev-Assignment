import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateQuestion from "./Components/CreateQuestion";
import Login from "./Components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createquestions" element={<CreateQuestion />} />
      </Routes>
    </Router>
  );
};

export default App;
