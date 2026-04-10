import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../redux/slices/authSlice';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5E3C] to-[#5C4033] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
        <div className="text-center mb-8"><div className="text-5xl mb-3 animate-float">🚀</div><h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2><p className="text-gray-500 mt-2">Sign in to continue</p></div>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5"><label className="block text-gray-700 font-medium mb-2">Email Address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent outline-none transition" placeholder="you@example.com" required /></div>
          <div className="mb-6"><label className="block text-gray-700 font-medium mb-2">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent outline-none transition" placeholder="••••••••" required /></div>
          <button type="submit" className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#A0522D] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">Sign In</button>
        </form>
        <p className="text-center text-gray-600 mt-6">Don't have an account? <Link to="/register" className="text-[#8B5E3C] font-semibold hover:underline">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
