import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'buyer') { navigate('/'); return; }
    api.get('/orders/my-orders').then(res => { setOrders(res.data.data || []); setLoading(false); }).catch(err => { console.error(err); setLoading(false); });
  }, [user, navigate]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="min-h-screen bg-[#FAF7F0]"><Navbar /><div className="flex justify-center items-center h-64"><div className="text-[#8B5E3C]">Loading...</div></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F0] to-[#F0EBE0]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p className="text-gray-500 mb-6">Track and manage your purchased services</p>
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md"><div className="text-6xl mb-4">📦</div><p className="text-gray-500 text-lg">No orders yet.</p><button onClick={() => navigate('/')} className="btn-primary text-white px-6 py-2 rounded-xl mt-4">Browse Gigs</button></div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1"><h3 className="text-xl font-bold text-gray-800">{order.gig?.title || 'Gig'}</h3><p className="text-gray-500 text-sm mt-1">Seller: {order.seller?.name}</p><p className="text-gray-600 mt-2">{order.requirements}</p></div>
                  <div className="text-right"><p className="text-3xl font-bold text-[#8B5E3C]">${order.price}</p><span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getStatusColor(order.status)}`}>{order.status}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
