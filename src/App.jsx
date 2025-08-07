import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JDDisplay from "./pages/JDDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jd/:id" element={<JDDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
