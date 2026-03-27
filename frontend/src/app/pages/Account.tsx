import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Heart, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';

export default function Account() {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: user?.password || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    personalDetails: user?.personalDetails || '',
    homeAddress: user?.homeAddress || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
        <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 sticky top-8">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-zinc-700 rounded-full flex items-center justify-center mb-6 border-4 border-green-400">
                  <User className="w-20 h-20 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {formData.username}
                </h2>
                <p className="text-gray-400 text-sm">
                  Member since {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Editable Fields */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
              <h3 className="text-xl font-bold text-white mb-6">
                Personal Information
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="username" className="text-gray-300 mb-2 block">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-300 mb-2 block">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300 mb-2 block">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-gray-300 mb-2 block">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-zinc-900 border-zinc-700 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300 mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-zinc-900 border-zinc-700 text-white"
                    placeholder="07700 900123"
                  />
                </div>

                <div>
                  <Label htmlFor="homeAddress" className="text-gray-300 mb-2 block">
                    Home Address
                  </Label>
                  <Input
                    id="homeAddress"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    className="bg-zinc-900 border-zinc-700 text-white"
                    placeholder="123 Main Street, London, UK"
                  />
                </div>

                <div>
                  <Label htmlFor="personalDetails" className="text-gray-300 mb-2 block">
                    Personal Details
                  </Label>
                  <Textarea
                    id="personalDetails"
                    name="personalDetails"
                    value={formData.personalDetails}
                    onChange={handleChange}
                    className="bg-zinc-900 border-zinc-700 text-white min-h-[120px]"
                    placeholder="Add any additional information about yourself..."
                  />
                </div>

                <div className="pt-6 border-t border-zinc-700">
                  <Button
                    onClick={handleSave}
                    className="w-full md:w-auto bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold px-8 py-6"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Link to="/watchlist" className="block">
                <Button className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold py-6 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  My Watchlist
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-6 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
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
