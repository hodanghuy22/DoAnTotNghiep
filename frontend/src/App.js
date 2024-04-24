import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
