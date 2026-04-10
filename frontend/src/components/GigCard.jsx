import { useNavigate } from 'react-router-dom';

function GigCard({ gig }) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100"
      onClick={() => navigate(`/gig/${gig._id}`)}
    >
      <div className="h-40 bg-gradient-to-r from-[#8B5E3C] to-[#C68B5E] rounded-t-lg"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-[#8B5E3C]">{gig.seller?.name?.[0] || 'S'}</span>
          </div>
          <span className="text-sm font-medium text-gray-700">{gig.seller?.name || 'Seller'}</span>
          <span className="text-yellow-500 text-sm">★ {gig.rating || '5.0'}</span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{gig.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{gig.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400">STARTING AT</span>
            <p className="text-xl font-bold text-[#8B5E3C]">${gig.price}</p>
          </div>
          <button className="border border-[#8B5E3C] text-[#8B5E3C] px-3 py-1 rounded text-sm hover:bg-[#8B5E3C] hover:text-white transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default GigCard;
