import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Task,Pomodoro, Home, Notes } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Task" element={<Task/>} />
        <Route path="/Pomodoro" element={<Pomodoro />} />
        <Route path="/Notes" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;
