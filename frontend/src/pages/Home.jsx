import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import GigCard from '../components/GigCard';
import api from '../services/api';

function Home() {
  const [gigs, setGigs] = useState([]);
  const [categories] = useState(['Web Development', 'Graphic Design', 'Writing', 'Video', 'Marketing', 'Music']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.append('category', selectedCategory.toLowerCase());
    if (searchQuery) params.append('search', searchQuery);
    api.get(`/gigs?${params.toString()}`).then(res => setGigs(res.data.data || [])).catch(err => console.error(err));
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#8B5E3C] to-[#C68B5E] text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the perfect freelance services</h1>
          <p className="text-lg mb-8">Work with talented sellers at your budget</p>
          <div className="max-w-2xl mx-auto flex bg-white rounded-full overflow-hidden shadow-lg">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for any service..." className="flex-1 px-6 py-3 text-gray-800 outline-none" />
            <button className="bg-[#8B5E3C] px-8 py-3 text-white font-semibold hover:bg-[#6B4A2C] transition">Search</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div><div className="text-2xl font-bold text-[#8B5E3C]">10,000+</div><div className="text-gray-500 text-sm">Active Gigs</div></div>
            <div><div className="text-2xl font-bold text-[#8B5E3C]">5,000+</div><div className="text-gray-500 text-sm">Happy Buyers</div></div>
            <div><div className="text-2xl font-bold text-[#8B5E3C]">2,000+</div><div className="text-gray-500 text-sm">Expert Sellers</div></div>
            <div><div className="text-2xl font-bold text-[#8B5E3C]">100%</div><div className="text-gray-500 text-sm">Secure Payments</div></div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 justify-center flex-wrap">
          <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === 'All' ? 'bg-[#8B5E3C] text-white' : 'bg-white text-gray-700 border hover:shadow'}`}>All Services</button>
          {categories.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === cat ? 'bg-[#8B5E3C] text-white' : 'bg-white text-gray-700 border hover:shadow'}`}>{cat}</button>)}
        </div>
      </div>

      {/* Gigs */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Services</h2>
        {gigs.length === 0 ? (
          <div className="text-center py-16"><p className="text-gray-500">No gigs found.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gigs.map(gig => <GigCard key={gig._id} gig={gig} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
