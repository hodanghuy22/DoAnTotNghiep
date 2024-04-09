import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';
import Login from "./pages/Login";
import BrandList from './pages/BrandList';
import CapacityList from './pages/CapacityList';
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import AddBrand from "./pages/AddBrand";
import AddCapacity from "./pages/AddCapacity";
import AddAdmin from "./pages/AddAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path='brand-list' element={<BrandList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='capacity-list' element={<CapacityList />} />
          <Route path='capacity' element={<AddCapacity />} />
          <Route path='user-list' element={<UserList />} />
          <Route path='add-admin' element={<AddAdmin />} />
          
        </Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
