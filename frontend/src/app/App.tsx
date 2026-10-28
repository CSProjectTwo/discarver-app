import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import CarDetails from './pages/CarDetails';
import Account from './pages/Account';
import Watchlist from './pages/Watchlist';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
