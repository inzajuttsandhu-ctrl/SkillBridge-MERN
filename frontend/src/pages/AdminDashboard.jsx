import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };
    
    try {
      const statsRes = await api.get('/admin/stats', { headers });
      setStats(statsRes.data.stats);
      
      const usersRes = await api.get('/admin/users', { headers });
      setUsers(usersRes.data.data);
      
      const gigsRes = await api.get('/admin/gigs', { headers });
      setGigs(gigsRes.data.data);
      
      const ordersRes = await api.get('/admin/orders', { headers });
      setOrders(ordersRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    }
  };

  const deleteGig = async (id) => {
    if (window.confirm('Delete this gig?')) {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/admin/gigs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#8B5E3C] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded hover:bg-red-700">Logout</button>
      </nav>
      
      <div className="flex">
        <div className="w-64 bg-white shadow-md h-screen p-4">
          <button onClick={() => setActiveTab('stats')} className="block w-full text-left p-2 hover:bg-gray-100 rounded mb-1">📊 Dashboard</button>
          <button onClick={() => setActiveTab('users')} className="block w-full text-left p-2 hover:bg-gray-100 rounded mb-1">👥 Users ({users.length})</button>
          <button onClick={() => setActiveTab('gigs')} className="block w-full text-left p-2 hover:bg-gray-100 rounded mb-1">🎯 Gigs ({gigs.length})</button>
          <button onClick={() => setActiveTab('orders')} className="block w-full text-left p-2 hover:bg-gray-100 rounded mb-1">📦 Orders ({orders.length})</button>
        </div>
        
        <div className="flex-1 p-6">
          {activeTab === 'stats' && stats && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold text-[#8B5E3C]">{stats.totalUsers}</div><div>Total Users</div></div>
                <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold text-[#8B5E3C]">{stats.totalGigs}</div><div>Total Gigs</div></div>
                <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold text-[#8B5E3C]">{stats.totalOrders}</div><div>Total Orders</div></div>
                <div className="bg-white p-4 rounded shadow"><div className="text-2xl font-bold text-[#8B5E3C]">${stats.totalRevenue}</div><div>Total Revenue</div></div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">All Users</h2>
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Role</th><th className="p-3 text-left">Actions</th></tr></thead>
                <tbody>{users.map(user => <tr key={user._id} className="border-t"><td className="p-3">{user.name}</td><td className="p-3">{user.email}</td><td className="p-3"><span className={`px-2 py-1 rounded text-xs ${user.role === 'seller' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{user.role}</span></td><td className="p-3"><button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button></td></tr>)}</tbody></table>
              </div>
            </div>
          )}
          
          {activeTab === 'gigs' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">All Gigs</h2>
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Title</th><th className="p-3 text-left">Seller</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Actions</th></tr></thead>
                <tbody>{gigs.map(gig => <tr key={gig._id} className="border-t"><td className="p-3">{gig.title}</td><td className="p-3">{gig.seller?.name}</td><td className="p-3">${gig.price}</td><td className="p-3"><button onClick={() => deleteGig(gig._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button></td></tr>)}</tbody></table>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">All Orders</h2>
              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Gig</th><th className="p-3 text-left">Buyer</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Status</th></tr></thead>
                <tbody>{orders.map(order => <tr key={order._id} className="border-t"><td className="p-3">{order.gig?.title}</td><td className="p-3">{order.buyer?.name}</td><td className="p-3">${order.price}</td><td className="p-3"><span className={`px-2 py-1 rounded text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{order.status}</span></td></tr>)}</tbody></table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
