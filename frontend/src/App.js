import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
