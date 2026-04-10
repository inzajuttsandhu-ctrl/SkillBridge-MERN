import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../redux/slices/authSlice';
import api from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5E3C] to-[#5C4033] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
        <div className="text-center mb-8"><div className="text-5xl mb-3 animate-float">🚀</div><h2 className="text-3xl font-bold text-gray-800">Create Account</h2><p className="text-gray-500 mt-2">Join SkillBridge today</p></div>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4"><label className="block text-gray-700 font-medium mb-2">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" placeholder="John Doe" required /></div>
          <div className="mb-4"><label className="block text-gray-700 font-medium mb-2">Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" placeholder="you@example.com" required /></div>
          <div className="mb-4"><label className="block text-gray-700 font-medium mb-2">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none" placeholder="••••••••" required /></div>
          <div className="mb-6"><label className="block text-gray-700 font-medium mb-2">I want to</label><select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] outline-none"><option value="buyer">Buy Services</option><option value="seller">Sell Services</option></select></div>
          <button type="submit" className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#A0522D] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">Sign Up</button>
        </form>
        <p className="text-center text-gray-600 mt-6">Already have an account? <Link to="/login" className="text-[#8B5E3C] font-semibold hover:underline">Sign In</Link></p>
      </div>
    </div>
  );
}

export default Register;
