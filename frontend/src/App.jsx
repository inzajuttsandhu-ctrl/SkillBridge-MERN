import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GigDetail from './pages/GigDetail';
import CreateGig from './pages/CreateGig';
import MyOrders from './pages/MyOrders';
import MyGigs from './pages/MyGigs';
import MySales from './pages/MySales';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const adminToken = localStorage.getItem('adminToken');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        
        {/* Protected User Routes */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/gig/:id" element={isAuthenticated ? <GigDetail /> : <Navigate to="/login" />} />
        <Route path="/create-gig" element={isAuthenticated ? <CreateGig /> : <Navigate to="/login" />} />
        <Route path="/my-orders" element={isAuthenticated ? <MyOrders /> : <Navigate to="/login" />} />
        <Route path="/my-gigs" element={isAuthenticated ? <MyGigs /> : <Navigate to="/login" />} />
        <Route path="/my-sales" element={isAuthenticated ? <MySales /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;