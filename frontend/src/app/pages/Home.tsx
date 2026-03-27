import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Search, Heart, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

// Car makes list (alphabetically sorted)
const carMakes = [
  'Audi', 'BMW', 'Citroën', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 
  'Kia', 'Land Rover', 'Mazda', 'Mercedes-Benz', 'Mini', 'Nissan', 'Peugeot', 
  'Renault', 'Seat', 'Škoda', 'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo'
];

// Most common UK models (when no make selected)
const commonUKModels = [
  'Ford Fiesta',
  'Vauxhall Corsa',
  'Volkswagen Golf',
  'Ford Focus',
  'Nissan Qashqai',
  'Mini Hatch'
];

// Models by make
const modelsByMake: Record<string, string[]> = {
  'Audi': ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5'],
  'BMW': ['1 Series', '3 Series', '5 Series', 'X1', 'X3', 'X5'],
  'Citroën': ['C1', 'C3', 'C4', 'Berlingo'],
  'Fiat': ['500', 'Panda', 'Tipo', '500X'],
  'Ford': ['Fiesta', 'Focus', 'Puma', 'Kuga', 'Ranger', 'Mustang'],
  'Honda': ['Civic', 'Jazz', 'CR-V', 'HR-V'],
  'Hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Kona'],
  'Jaguar': ['E-Pace', 'F-Pace', 'XE', 'XF'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Niro'],
  'Land Rover': ['Range Rover', 'Discovery', 'Defender', 'Evoque'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-5', 'MX-5'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC'],
  'Mini': ['Hatch', 'Clubman', 'Countryman', 'Convertible'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'Leaf', 'X-Trail'],
  'Peugeot': ['108', '208', '308', '2008', '3008'],
  'Renault': ['Clio', 'Captur', 'Megane', 'Kadjar'],
  'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca'],
  'Škoda': ['Fabia', 'Octavia', 'Superb', 'Karoq', 'Kodiaq'],
  'Toyota': ['Aygo', 'Yaris', 'Corolla', 'RAV4', 'C-HR'],
  'Vauxhall': ['Corsa', 'Astra', 'Mokka', 'Crossland', 'Grandland'],
  'Volkswagen': ['Polo', 'Golf', 'Tiguan', 'T-Roc', 'Passat', 'Arteon'],
  'Volvo': ['V40', 'V60', 'XC40', 'XC60', 'XC90']
};

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Get models based on selected make
  const availableModels = selectedMake && modelsByMake[selectedMake] 
    ? modelsByMake[selectedMake] 
    : commonUKModels;

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      {/* Navbar */}
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-green-400">Discarver</h1>
            
            {/* Make Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                Make
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                <DropdownMenuItem className="text-white hover:bg-zinc-700">Ford</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-zinc-700">Volkswagen</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-zinc-700">Vauxhall</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-zinc-700">BMW</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-zinc-700">Mercedes-Benz</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-zinc-700">Audi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0"
              >
                Sign In / Register
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <section 
        className="relative bg-cover bg-center py-32"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1644749700856-a82a92828a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJzJTIwc2hvd3Jvb218ZW58MXx8fHwxNzcxNTM4MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Car
            </h2>
            <p className="text-xl text-white/90">
              Search thousands of cars from trusted dealers
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-zinc-900 rounded-lg shadow-2xl p-6 border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Postcode
                </label>
                <Input 
                  placeholder="Enter postcode" 
                  className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Make
                </label>
                <Select onValueChange={(value) => setSelectedMake(value)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Any make" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-zinc-800 border-zinc-700">
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make} className="text-white">
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Model
                </label>
                <Select key={selectedMake}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder={selectedMake ? `${selectedMake} models` : "Popular models"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-zinc-800 border-zinc-700">
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model} className="text-white">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Price
                </label>
                <Select>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Max price" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="5000" className="text-white">Up to £5,000</SelectItem>
                    <SelectItem value="10000" className="text-white">Up to £10,000</SelectItem>
                    <SelectItem value="15000" className="text-white">Up to £15,000</SelectItem>
                    <SelectItem value="20000" className="text-white">Up to £20,000</SelectItem>
                    <SelectItem value="30000" className="text-white">Up to £30,000</SelectItem>
                    <SelectItem value="50000" className="text-white">Up to £50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Condition
                </label>
                <Select>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Any condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="new" className="text-white">New</SelectItem>
                    <SelectItem value="used" className="text-white">Used</SelectItem>
                    <SelectItem value="salvage" className="text-white">Salvage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 py-6 text-lg font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Cars
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-zinc-900 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            Featured Categories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Electric */}
            <div 
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-green-400 transition-all duration-300 h-64"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwxfHx8fDE3NzE1MjkxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white text-xl font-bold">Electric</h4>
                <p className="text-green-400 text-sm mt-1">Zero emissions</p>
              </div>
            </div>

            {/* SUVs */}
            <div 
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-green-400 transition-all duration-300 h-64"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1700884520248-92092bd21e63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBTVVZ8ZW58MXx8fHwxNzcxNjA0NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white text-xl font-bold">SUVs</h4>
                <p className="text-green-400 text-sm mt-1">Space & comfort</p>
              </div>
            </div>

            {/* Under £5k */}
            <div 
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-green-400 transition-all duration-300 h-64"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1705769943793-821f557c6942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZmZvcmRhYmxlJTIwY29tcGFjdCUyMGNhcnxlbnwxfHx8fDE3NzE2MDQ0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white text-xl font-bold">Under £5k</h4>
                <p className="text-green-400 text-sm mt-1">Budget friendly</p>
              </div>
            </div>

            {/* Salvage */}
            <div 
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-green-400 transition-all duration-300 h-64"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1707573057039-174ab52c5198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWx2YWdlJTIwZGFtYWdlZCUyMGNhcnxlbnwxfHx8fDE3NzE2MDQ0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white text-xl font-bold">Salvage</h4>
                <p className="text-green-400 text-sm mt-1">Repair projects</p>
              </div>
            </div>

            {/* Auction */}
            <div 
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-green-400 transition-all duration-300 h-64"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1657141733526-bbc12c0a8331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FyJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzE2MDQ0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white text-xl font-bold">Auction</h4>
                <p className="text-green-400 text-sm mt-1">Best deals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 text-white py-12">
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
                Email: info@discarver.com<br />
                Phone: 0800 123 4567<br />
                Hours: Mon-Sat 9am-6pm
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-lg mb-4 text-green-400">Terms & Conditions</h5>
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

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
