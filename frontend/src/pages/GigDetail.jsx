import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import api from '../services/api';

function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requirements, setRequirements] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/gigs/${id}`).then(res => { setGig(res.data.data); setLoading(false); }).catch(err => { setError('Gig not found'); setLoading(false); });
  }, [id]);

  const handleOrder = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (user?.role !== 'buyer') { alert('Only buyers can place orders'); return; }
    if (!requirements.trim()) { alert('Please enter requirements'); return; }
    try {
      await api.post('/orders', { gigId: gig._id, requirements });
      setOrderSuccess(true);
      setTimeout(() => navigate('/my-orders'), 2000);
    } catch (err) { alert(err.response?.data?.message || 'Order failed'); }
  };

  if (loading) return <div className="min-h-screen bg-[#FAF7F0]"><Navbar /><div className="flex justify-center items-center h-64"><div className="text-[#8B5E3C] text-xl">Loading...</div></div></div>;
  if (error || !gig) return <div className="min-h-screen bg-[#FAF7F0]"><Navbar /><div className="flex justify-center items-center h-64"><div className="text-red-500 text-xl">{error || 'Gig not found'}</div></div></div>;

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gradient-to-br from-[#8B5E3C] to-[#D2B48C] rounded-2xl h-96 flex items-center justify-center mb-6 shadow-lg"><span className="text-7xl animate-float">🚀</span></div>
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-gradient-to-br from-[#FAF7F0] to-[#E8E4D9] rounded-full flex items-center justify-center shadow-md"><span className="text-2xl font-bold text-[#8B5E3C]">{gig.seller?.name?.[0] || 'S'}</span></div><div><h3 className="text-xl font-bold text-gray-800">{gig.seller?.name || 'Seller'}</h3><div className="flex items-center gap-2 mt-1"><span className="text-yellow-500 text-lg">★★★★★</span><span className="text-gray-600">{gig.rating || '5.0'}</span></div></div></div></div>
            <div className="bg-white rounded-2xl p-6 shadow-md"><h2 className="text-2xl font-bold text-gray-800 mb-4">About This Gig</h2><p className="text-gray-600 leading-relaxed">{gig.description}</p>{gig.tags?.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{gig.tags.map((tag, idx) => <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#{tag}</span>)}</div>}</div>
          </div>
          <div className="lg:w-96"><div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"><div className="border-b pb-4 mb-4"><span className="text-sm text-gray-500 uppercase tracking-wide">Starting at</span><p className="text-4xl font-bold text-[#8B5E3C]">${gig.price}</p></div>{orderSuccess ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center">✅ Order placed! Redirecting...</div> : <><textarea rows="4" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Describe what you need..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none mb-4" /><button onClick={handleOrder} className="w-full btn-primary text-white py-3 rounded-xl font-semibold">Continue to Order</button></>}<div className="mt-4 text-center text-sm text-gray-500"><p>✓ Secure payment</p><p>✓ Money-back guarantee</p><p>✓ 24/7 support</p></div></div></div>
        </div>
      </div>
    </div>
  );
}

export default GigDetail;
