import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateQuestion from "./Components/CreateQuestion";
import Feedback from "./Components/Feedback";
import Login from "./Components/Login";
import Response from "./Components/Response";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createquestions" element={<CreateQuestion />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/response" element={<Response />} />
      </Routes>
    </Router>
  );
};

export default App;
