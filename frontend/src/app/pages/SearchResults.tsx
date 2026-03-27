import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, MapPin, Gauge, Calendar, Fuel, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { apiGetListings, type ListingFilters } from "../api";

interface Listing {
  _id:            string;
  title:          string;
  price:          number;
  odometer_miles: number;
  condition:      string;
  colour:         string;
  images:         string[];
  seller_details: { location: string; name: string; seller_type: string };
  vehicle: {
    trim:    { year: number };
    engine?: { transmission: string; fuel_type: string };
    body?:   { type: string };
  };
}

export default function SearchResults() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [listings,  setListings]  = useState<Listing[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 55000]);
  const [condition,  setCondition]  = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const filters: ListingFilters = {};
        if (priceRange[0] > 0)      filters.min_price = priceRange[0];
        if (priceRange[1] < 55000)  filters.max_price = priceRange[1];
        if (condition)              filters.condition  = condition;
        const data = await apiGetListings(filters);
        setListings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load listings");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [priceRange, condition]);

  return (
    <div className="min-h-screen bg-zinc-900">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/"><h1 className="text-2xl font-bold text-green-400">Discarver</h1></Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/account">
                  <Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2">
                    <User className="w-4 h-4" /> Account
                  </Button>
                </Link>
                <Link to="/watchlist">
                  <Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Watchlist
                  </Button>
                </Link>
              </>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}
                className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0">
                Sign In / Register
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-3">Price Range</label>
                <Slider min={0} max={55000} step={500} value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-3 [&_[data-slot=slider-range]]:bg-green-400 [&_[data-slot=slider-thumb]]:border-green-400" />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>£{priceRange[0].toLocaleString()}</span>
                  <span>£{priceRange[1] === 55000 ? "55,000+" : priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">Condition</label>
                <Select onValueChange={(v) => setCondition(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                    <SelectValue placeholder="Any condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all"       className="text-white">Any</SelectItem>
                    <SelectItem value="excellent" className="text-white">Excellent</SelectItem>
                    <SelectItem value="good"      className="text-white">Good</SelectItem>
                    <SelectItem value="fair"      className="text-white">Fair</SelectItem>
                    <SelectItem value="poor"      className="text-white">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => { setPriceRange([0, 55000]); setCondition(""); }}
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white">
                Clear filters
              </Button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Search Results</h2>
              <p className="text-gray-400">
                {loading ? "Loading..." : `${listings.length} cars found`}
              </p>
            </div>

            {error && <p className="text-red-400 mb-4">{error}</p>}

            {!loading && listings.length === 0 && !error && (
              <div className="bg-zinc-800 rounded-lg p-12 border border-zinc-700 text-center">
                <p className="text-gray-400">No listings found. Try adjusting your filters.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((car) => (
                <div key={car._id}
                  className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-green-400 transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden bg-zinc-900">
                    <img
                      src={car.images[0] || "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600"}
                      alt={car.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{car.title}</h3>
                    <p className="text-2xl font-bold text-green-400 mb-4">
                      £{car.price.toLocaleString()}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{car.vehicle?.trim?.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge className="w-4 h-4" />
                        <span>{car.odometer_miles.toLocaleString()} mi</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" />
                        <span>{car.vehicle?.engine?.fuel_type ?? "—"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{car.seller_details?.location}</span>
                      </div>
                    </div>
                    <Link to={`/car/${car._id}`} className="block">
                      <Button className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}