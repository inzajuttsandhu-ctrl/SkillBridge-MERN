import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'seller') { navigate('/'); return; }
    api.get('/gigs/my-gigs').then(res => { setGigs(res.data.data || []); setLoading(false); }).catch(err => { console.error(err); setLoading(false); });
  }, [user, navigate]);

  const deleteGig = async (gigId) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      try { await api.delete(`/gigs/${gigId}`); setGigs(gigs.filter(gig => gig._id !== gigId)); } catch (err) { alert('Failed to delete gig'); }
    }
  };

  if (loading) return <div className="min-h-screen bg-[#FAF7F0]"><Navbar /><div className="flex justify-center items-center h-64"><div className="text-[#8B5E3C]">Loading...</div></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F0] to-[#F0EBE0]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4"><div><h1 className="text-3xl font-bold text-gray-800">My Gigs</h1><p className="text-gray-500">Manage your services</p></div><button onClick={() => navigate('/create-gig')} className="btn-primary text-white px-6 py-2 rounded-xl">+ Create New Gig</button></div>
        {gigs.length === 0 ? <div className="bg-white rounded-2xl p-12 text-center shadow-md"><div className="text-6xl mb-4">🎯</div><p className="text-gray-500 text-lg">You haven't created any gigs yet.</p><button onClick={() => navigate('/create-gig')} className="btn-primary text-white px-6 py-2 rounded-xl mt-4">Create Your First Gig</button></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{gigs.map(gig => <div key={gig._id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"><div className="h-32 bg-gradient-to-r from-[#8B5E3C] to-[#D2B48C] rounded-xl mb-3"></div><h3 className="font-bold text-gray-800 text-lg mb-1">{gig.title}</h3><p className="text-gray-500 text-sm mb-2 line-clamp-2">{gig.description}</p><p className="text-2xl font-bold text-[#8B5E3C] mb-3">${gig.price}</p><div className="flex gap-2"><button onClick={() => navigate(`/gig/${gig._id}`)} className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-sm hover:bg-gray-200 transition">View</button><button onClick={() => deleteGig(gig._id)} className="flex-1 bg-red-500 text-white px-3 py-2 rounded-xl text-sm hover:bg-red-600 transition">Delete</button></div></div>)}</div>}
      </div>
    </div>
  );
}

export default MyGigs;
