import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, User, MapPin, Calendar, Gauge, Fuel, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { apiGetListing } from "../api";

interface WatchlistItem {
  _id:            string;
  title:          string;
  price:          number;
  odometer_miles: number;
  images:         string[];
  seller_details: { location: string };
  vehicle: {
    trim:    { year: number };
    engine?: { fuel_type: string; transmission: string };
  };
}

export default function Watchlist() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [watchlistCars, setWatchlistCars] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    async function load() {
      const stored = JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
      if (stored.length === 0) { setLoading(false); return; }
      const results = await Promise.all(
        stored.map((id) => apiGetListing(id).catch(() => null))
      );
      setWatchlistCars(results.filter(Boolean) as WatchlistItem[]);
      setLoading(false);
    }
    load();
  }, []);

  const removeFromWatchlist = (id: string) => {
    const stored = JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
    localStorage.setItem("watchlist", JSON.stringify(stored.filter((i) => i !== id)));
    setWatchlistCars((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/"><h1 className="text-2xl font-bold text-green-400">Discarver</h1></Link>
          <div className="flex items-center gap-4">
            <Link to="/account"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2"><User className="w-4 h-4" /> Account</Button></Link>
            <Link to="/watchlist"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2"><Heart className="w-4 h-4" /> Watchlist</Button></Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
            <p className="text-gray-400">{watchlistCars.length} {watchlistCars.length === 1 ? "car" : "cars"} saved</p>
          </div>
          <Link to="/search"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">Browse More Cars</Button></Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : watchlistCars.length === 0 ? (
          <div className="bg-zinc-800 rounded-lg p-12 border border-zinc-700 text-center">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-6">Add cars from any listing page to track your favourites</p>
            <Link to="/search"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">Browse Cars</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlistCars.map((car) => (
              <div key={car._id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden hover:border-green-400 transition-all group">
                <div className="relative h-48 bg-zinc-700 overflow-hidden">
                  <img src={car.images[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600"} alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <button onClick={() => removeFromWatchlist(car._id)}
                    className="absolute top-3 right-3 p-2 bg-zinc-900/80 rounded-full hover:bg-red-500 transition-colors z-10">
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{car.title}</h3>
                  <p className="text-2xl font-bold text-green-400 mb-4">£{car.price.toLocaleString()}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{car.vehicle?.trim?.year}</span></div>
                    <div className="flex items-center gap-1"><Gauge className="w-4 h-4" /><span>{car.odometer_miles.toLocaleString()} mi</span></div>
                    <div className="flex items-center gap-1"><Fuel className="w-4 h-4" /><span>{car.vehicle?.engine?.fuel_type}</span></div>
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{car.seller_details?.location}</span></div>
                  </div>
                  <Link to={`/car/${car._id}`} className="block">
                    <Button className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-zinc-950 border-t border-zinc-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-zinc-800 pt-8 text-center text-gray-400"><p>&copy; 2026 Discarver. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}