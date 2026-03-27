import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, User, MapPin, Calendar, Gauge, Fuel, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

// Mock watchlist data
const mockWatchlistCars = [
  {
    id: 1,
    name: '2021 BMW 3 Series',
    price: 28500,
    year: 2021,
    mileage: 15000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    location: 'London',
    distance: 5,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  },
  {
    id: 3,
    name: '2023 Tesla Model 3',
    price: 42000,
    year: 2023,
    mileage: 3000,
    fuel: 'Electric',
    transmission: 'Automatic',
    location: 'Birmingham',
    distance: 8,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
  },
  {
    id: 5,
    name: '2022 Audi A4',
    price: 35000,
    year: 2022,
    mileage: 12000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    location: 'Bristol',
    distance: 10,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
  },
];

export default function Watchlist() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [watchlistCars, setWatchlistCars] = useState(mockWatchlistCars);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const removeFromWatchlist = (id: number) => {
    setWatchlistCars(watchlistCars.filter((car) => car.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Navbar */}
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold text-green-400">Discarver</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/account">
              <Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2">
                <User className="w-4 h-4" />
                Account
              </Button>
            </Link>
            <Link to="/watchlist">
              <Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Watchlist
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
            <p className="text-gray-400">
              {watchlistCars.length} {watchlistCars.length === 1 ? 'car' : 'cars'} saved
            </p>
          </div>
          <Link to="/search">
            <Button className="bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">
              Browse More Cars
            </Button>
          </Link>
        </div>

        {watchlistCars.length === 0 ? (
          <div className="bg-zinc-800 rounded-lg p-12 border border-zinc-700 text-center">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Start adding cars to your watchlist to keep track of your favorites
            </p>
            <Link to="/search">
              <Button className="bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">
                Browse Cars
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlistCars.map((car) => (
              <div
                key={car.id}
                className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden hover:border-green-400 transition-all group"
              >
                {/* Car Image */}
                <div className="relative h-48 bg-zinc-700 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWatchlist(car.id)}
                    className="absolute top-3 right-3 p-2 bg-zinc-900/80 rounded-full hover:bg-red-500 transition-colors group/remove z-10"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Car Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{car.name}</h3>
                  <p className="text-2xl font-bold text-green-400 mb-4">
                    £{car.price.toLocaleString()}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" />
                      <span>{car.mileage.toLocaleString()} mi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{car.distance} miles</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{car.transmission}</span>
                    <span>{car.location}</span>
                  </div>

                  <Link to={`/car/${car.id}`} className="block">
                    <Button className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h5 className="font-bold text-lg mb-4 text-green-400">About Us</h5>
              <p className="text-gray-400">
                Discarver is your trusted platform for finding the perfect car.
                We connect buyers with quality vehicles across the UK.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-4 text-green-400">Contact</h5>
              <p className="text-gray-400">
                Email: info@discarver.com
                <br />
                Phone: 0800 123 4567
                <br />
                Hours: Mon-Sat 9am-6pm
              </p>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-4 text-green-400">
                Terms & Conditions
              </h5>
              <ul className="text-gray-400 space-y-2">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Discarver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
