import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Heart, MapPin, ArrowLeft, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { apiGetListing } from "../api";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [showAuthModal,    setShowAuthModal]    = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeImage,      setActiveImage]      = useState(0);
  const [hoveredImage,     setHoveredImage]     = useState<number | null>(null);
  const [listing,  setListing]  = useState<any>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    const stored = JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
    setIsFavorite(stored.includes(id));
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await apiGetListing(id!);
        setListing(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load listing");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    const stored = JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
    const updated = isFavorite ? stored.filter((i) => i !== id) : [...stored, id];
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="min-h-screen bg-zinc-900 flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>;
  if (error || !listing) return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{error || "Car not found"}</h2>
        <Link to="/search"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900">Back to Search</Button></Link>
      </div>
    </div>
  );

  const images = listing.images?.length ? listing.images : ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"];
  const displayImage = hoveredImage !== null ? hoveredImage : activeImage;

  return (
    <div className="min-h-screen bg-zinc-900">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/"><h1 className="text-2xl font-bold text-green-400">Discarver</h1></Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/account"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2"><User className="w-4 h-4" /> Account</Button></Link>
                <Link to="/watchlist"><Button className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0 flex items-center gap-2"><Heart className="w-4 h-4" /> Watchlist</Button></Link>
              </>
            ) : (
              <Button onClick={() => setShowAuthModal(true)} className="bg-green-400 hover:bg-green-500 text-zinc-900 border-0">Sign In / Register</Button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/search" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to search results
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-zinc-800 rounded-lg overflow-hidden mb-4 border border-zinc-700">
              <img src={images[displayImage]} alt={listing.title} className="w-full h-[400px] object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {images.map((img: string, i: number) => (
                <div key={i}
                  className={`bg-zinc-800 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === i ? "border-green-400" : "border-zinc-700 hover:border-zinc-600"}`}
                  onClick={() => setActiveImage(i)} onMouseEnter={() => setHoveredImage(i)} onMouseLeave={() => setHoveredImage(null)}>
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </div>
              ))}
            </div>
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{listing.description}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Body type",    listing.vehicle?.body?.type],
                  ["Doors",        listing.vehicle?.body?.doors],
                  ["Seats",        listing.vehicle?.body?.seats],
                  ["Engine",       listing.vehicle?.engine?.size],
                  ["Horsepower",   listing.vehicle?.engine?.horsepower_hp ? `${listing.vehicle.engine.horsepower_hp} BHP` : null],
                  ["Torque",       listing.vehicle?.engine?.torque_ft_lbs ? `${listing.vehicle.engine.torque_ft_lbs} ft-lbs` : null],
                  ["Drive type",   listing.vehicle?.engine?.drive_type],
                  ["MPG",          listing.vehicle?.mileage?.combined_mpg ? `${listing.vehicle.mileage.combined_mpg} combined` : null],
                  ["Fuel tank",    listing.vehicle?.mileage?.fuel_tank_capacity],
                  ["Colour",       listing.colour],
                  ["Prev. owners", listing.previous_owners],
                  ["MOT",          listing.MOT_expiry],
                  ["Road tax",     listing.road_tax],
                  ["Emissions",    listing.emissions_class],
                ].filter(([, v]) => v != null).map(([label, value]) => (
                  <div key={label as string} className="flex flex-col">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="text-white font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
            {listing.features?.length > 0 && (
              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <h3 className="text-xl font-bold text-white mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {listing.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" /><span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 sticky top-8">
              <h1 className="text-3xl font-bold text-white mb-2">{listing.title}</h1>
              <p className="text-lg text-gray-400 mb-6">{listing.name}</p>
              <div className="mb-6 pb-6 border-b border-zinc-700">
                <p className="text-4xl font-bold text-green-400">£{listing.price?.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-zinc-700">
                <div><p className="text-sm text-gray-400">Year</p><p className="text-white font-semibold">{listing.vehicle?.trim?.year}</p></div>
                <div><p className="text-sm text-gray-400">Mileage</p><p className="text-white font-semibold">{listing.odometer_miles?.toLocaleString()} miles</p></div>
                <div><p className="text-sm text-gray-400">Fuel type</p><p className="text-white font-semibold">{listing.vehicle?.engine?.fuel_type}</p></div>
                <div><p className="text-sm text-gray-400">Transmission</p><p className="text-white font-semibold">{listing.vehicle?.engine?.transmission}</p></div>
              </div>
              <div className="mb-6 pb-6 border-b border-zinc-700">
                <div className="flex items-center gap-2 text-gray-300"><MapPin className="w-4 h-4 text-green-400" /><span>{listing.seller_details?.location}</span></div>
              </div>
              <div className="mb-6 pb-6 border-b border-zinc-700">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">SELLER DETAILS</h3>
                <div className="flex items-center gap-2 text-gray-300"><User className="w-4 h-4 text-green-400" /><span>{listing.seller_details?.name}</span></div>
                <p className="text-sm text-gray-400 ml-6 capitalize">{listing.seller_details?.seller_type}</p>
              </div>
              <div className="space-y-3">
                <Button onClick={() => setShowContactModal(true)}
                  className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 py-6 text-lg font-bold">
                  Buy Now
                </Button>
                <Button variant="outline" onClick={toggleFavorite}
                  className={`w-full py-6 border-2 transition-colors ${isFavorite ? "bg-green-400 border-green-400 text-zinc-900 hover:bg-green-500" : "bg-transparent border-green-400 text-green-400 hover:bg-green-400/10"}`}>
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Saved to Watchlist" : "Add to Watchlist"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-400">Seller Contact Details</DialogTitle>
            <DialogDescription className="text-gray-400">Get in touch with the seller to arrange a viewing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
              <div className="flex items-start gap-3 mb-3"><User className="w-5 h-5 text-green-400 mt-0.5" /><div><p className="text-sm text-gray-400">Name</p><p className="text-lg font-semibold text-white">{listing.seller_details?.name}</p></div></div>
              <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-green-400 mt-0.5" /><div><p className="text-sm text-gray-400">Location</p><p className="text-lg font-semibold text-white">{listing.seller_details?.location}</p></div></div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
              <p className="text-sm text-gray-400 mb-2">Seller type</p>
              <p className="text-white font-medium capitalize">{listing.seller_details?.seller_type}</p>
            </div>
          </div>
          <Button onClick={() => setShowContactModal(false)} className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold mt-4">Close</Button>
        </DialogContent>
      </Dialog>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}