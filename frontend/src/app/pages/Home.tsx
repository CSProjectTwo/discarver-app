import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Search, Heart, ChevronDown, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";

const carMakes = [
  "Audi","BMW","Citroën","Fiat","Ford","Honda","Hyundai","Jaguar",
  "Kia","Land Rover","Mazda","Mercedes-Benz","Mini","Nissan","Peugeot",
  "Renault","Seat","Škoda","Toyota","Vauxhall","Volkswagen","Volvo",
];

const commonUKModels = ["Ford Fiesta","Vauxhall Corsa","Volkswagen Golf","Ford Focus","Nissan Qashqai","Mini Hatch"];

const modelsByMake: Record<string, string[]> = {
  "Audi":["A1","A3","A4","A6","Q3","Q5"],
  "BMW":["1 Series","3 Series","5 Series","X1","X3","X5"],
  "Citroën":["C1","C3","C4","Berlingo"],
  "Fiat":["500","Panda","Tipo","500X"],
  "Ford":["Fiesta","Focus","Puma","Kuga","Ranger","Mustang"],
  "Honda":["Civic","Jazz","CR-V","HR-V"],
  "Hyundai":["i10","i20","i30","Tucson","Kona"],
  "Jaguar":["E-Pace","F-Pace","XE","XF"],
  "Kia":["Picanto","Rio","Ceed","Sportage","Niro"],
  "Land Rover":["Range Rover","Discovery","Defender","Evoque"],
  "Mazda":["2","3","6","CX-3","CX-5","MX-5"],
  "Mercedes-Benz":["A-Class","C-Class","E-Class","GLA","GLC"],
  "Mini":["Hatch","Clubman","Countryman","Convertible"],
  "Nissan":["Micra","Juke","Qashqai","Leaf","X-Trail"],
  "Peugeot":["108","208","308","2008","3008"],
  "Renault":["Clio","Captur","Megane","Kadjar"],
  "Seat":["Ibiza","Leon","Arona","Ateca"],
  "Škoda":["Fabia","Octavia","Superb","Karoq","Kodiaq"],
  "Toyota":["Aygo","Yaris","Corolla","RAV4","C-HR"],
  "Vauxhall":["Corsa","Astra","Mokka","Crossland","Grandland"],
  "Volkswagen":["Polo","Golf","Tiguan","T-Roc","Passat","Arteon"],
  "Volvo":["V40","V60","XC40","XC60","XC90"],
};

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedMake,    setSelectedMake]    = useState("");
  const [selectedModel,   setSelectedModel]   = useState("");
  const [selectedPrice,   setSelectedPrice]   = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [showAuthModal,   setShowAuthModal]   = useState(false);

  const availableModels = selectedMake && modelsByMake[selectedMake]
    ? modelsByMake[selectedMake]
    : commonUKModels;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedMake)      params.set("make",      selectedMake);
    if (selectedModel)     params.set("model",     selectedModel);
    if (selectedPrice)     params.set("max_price", selectedPrice);
    if (selectedCondition) params.set("condition", selectedCondition);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-green-400">Discarver</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400">
                Make <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                {["Ford","Volkswagen","Vauxhall","BMW","Mercedes-Benz","Audi"].map(m => (
                  <DropdownMenuItem key={m} className="text-white hover:bg-zinc-700"
                    onClick={() => navigate(`/search?make=${m}`)}>
                    {m}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

      <section className="relative bg-cover bg-center py-32"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1644749700856-a82a92828a1b?w=1080')` }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Car</h2>
            <p className="text-xl text-white/90">Search thousands of cars from trusted dealers</p>
          </div>
          <div className="bg-zinc-900 rounded-lg shadow-2xl p-6 border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Postcode</label>
                <Input placeholder="Enter postcode" className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Make</label>
                <Select onValueChange={(v) => { setSelectedMake(v); setSelectedModel(""); }}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Any make" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-zinc-800 border-zinc-700">
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make} className="text-white">{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Model</label>
                <Select key={selectedMake} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder={selectedMake ? `${selectedMake} models` : "Popular models"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-zinc-800 border-zinc-700">
                    {availableModels.map((model) => (
                      <SelectItem key={model} value={model} className="text-white">{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Price</label>
                <Select onValueChange={setSelectedPrice}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Max price" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {[["5000","Up to £5,000"],["10000","Up to £10,000"],["15000","Up to £15,000"],["20000","Up to £20,000"],["30000","Up to £30,000"],["50000","Up to £50,000"]].map(([v,l]) => (
                      <SelectItem key={v} value={v} className="text-white">{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Condition</label>
                <Select onValueChange={setSelectedCondition}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Any condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {[["excellent","Excellent"],["good","Good"],["fair","Fair"],["poor","Poor"]].map(([v,l]) => (
                      <SelectItem key={v} value={v} className="text-white">{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSearch}
              className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 py-6 text-lg font-semibold">
              <Search className="w-5 h-5 mr-2" /> Search Cars
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-900 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Featured Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label:"Electric",  sub:"Zero emissions",  img:"photo-1593941707874-ef25b8b4a92b", q:"engine_type=electric" },
              { label:"SUVs",      sub:"Space & comfort",  img:"photo-1700884520248-92092bd21e63", q:"body_type=SUV" },
              { label:"Under £5k", sub:"Budget friendly",  img:"photo-1705769943793-821f557c6942", q:"max_price=5000" },
              { label:"Hatchbacks",sub:"City perfect",     img:"photo-1580273916550-e323be2ae537", q:"body_type=Hatchback" },
              { label:"Saloons",   sub:"Executive style",  img:"photo-1555215695-3004980ad54e", q:"body_type=Saloon" },
            ].map(({ label, sub, img, q }) => (
              <div key={label} onClick={() => navigate(`/search?${q}`)}
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:ring-2 hover:ring-green-400 transition-all duration-300 h-64">
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/${img}?w=600')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white text-xl font-bold">{label}</h4>
                  <p className="text-green-400 text-sm mt-1">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div><h5 className="font-bold text-lg mb-4 text-green-400">About Us</h5><p className="text-gray-400">Discarver is your trusted platform for finding the perfect car. We connect buyers with quality vehicles across the UK.</p></div>
            <div><h5 className="font-bold text-lg mb-4 text-green-400">Contact</h5><p className="text-gray-400">Email: info@discarver.com<br />Phone: 0800 123 4567<br />Hours: Mon-Sat 9am-6pm</p></div>
            <div><h5 className="font-bold text-lg mb-4 text-green-400">Terms & Conditions</h5><ul className="text-gray-400 space-y-2"><li><a href="#" className="hover:text-green-400">Privacy Policy</a></li><li><a href="#" className="hover:text-green-400">Terms of Service</a></li></ul></div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-gray-400"><p>&copy; 2026 Discarver. All rights reserved.</p></div>
        </div>
      </footer>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}