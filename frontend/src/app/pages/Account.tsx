import { Link, useNavigate } from "react-router";
import { User, Heart, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext";

export default function Account() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/"><h1 className="text-2xl font-bold text-green-400">Discarver</h1></Link>
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 sticky top-8">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-zinc-700 rounded-full flex items-center justify-center mb-6 border-4 border-green-400">
                  <User className="w-20 h-20 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{user?.name}</h2>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-6">Account Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Name</p>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/watchlist" className="block">
                <Button className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold py-6 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" /> My Watchlist
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline"
                className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-6 flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-zinc-950 border-t border-zinc-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-zinc-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Discarver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}