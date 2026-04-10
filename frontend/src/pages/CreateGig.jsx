import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import api from '../services/api';

function CreateGig() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', deliveryTime: '', category: 'web-development', tags: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'graphic-design', label: '🎨 Graphic Design' },
    { value: 'web-development', label: '💻 Web Development' },
    { value: 'writing', label: '✍️ Writing' },
    { value: 'video', label: '🎬 Video' },
    { value: 'marketing', label: '📢 Marketing' },
    { value: 'music', label: '🎵 Music' }
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const tagsArray = formData.tags.split(',').map(tag => tag.trim());
    try {
      await api.post('/gigs', { ...formData, price: parseFloat(formData.price), deliveryTime: parseInt(formData.deliveryTime), tags: tagsArray });
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Failed to create gig'); setLoading(false); }
  };

  if (user?.role !== 'seller') {
    return (<div className="min-h-screen bg-[#FAF7F0]"><Navbar /><div className="flex justify-center items-center h-64"><div className="bg-white rounded-2xl p-8 text-center shadow-xl"><div className="text-6xl mb-4">🔒</div><h2 className="text-2xl font-bold mb-2">Access Denied</h2><p className="mb-4">Only sellers can create gigs.</p><button onClick={() => navigate('/')} className="btn-primary text-white px-6 py-2 rounded-xl">Go Home</button></div></div></div>);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F0] to-[#F0EBE0] pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 animate-scale-in">
          <div className="text-center mb-6"><div className="text-5xl mb-3">🚀</div><h1 className="text-3xl font-bold text-gray-800">Create a New Gig</h1><p className="text-gray-500">Share your skills and start earning</p></div>
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4"><label className="block text-gray-700 font-semibold mb-2">Gig Title *</label><input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="I will build a modern website" className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" required /></div>
            <div className="mb-4"><label className="block text-gray-700 font-semibold mb-2">Description *</label><textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe what you'll deliver..." className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" required /></div>
            <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-gray-700 font-semibold mb-2">Price ($) *</label><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="50" className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" required /></div><div><label className="block text-gray-700 font-semibold mb-2">Delivery (days) *</label><input type="number" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} placeholder="7" className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" required /></div></div>
            <div className="mb-4"><label className="block text-gray-700 font-semibold mb-2">Category *</label><select name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none">{categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}</select></div>
            <div className="mb-6"><label className="block text-gray-700 font-semibold mb-2">Tags (comma separated)</label><input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="react, node, mongodb" className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" /></div>
            <div className="flex gap-4"><button type="button" onClick={() => navigate('/')} className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">Cancel</button><button type="submit" disabled={loading} className="flex-1 btn-primary text-white py-3 rounded-xl font-semibold disabled:opacity-50">{loading ? 'Creating...' : 'Create Gig'}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGig;
