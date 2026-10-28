import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen:   boolean;
  onClose:  () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin]                   = useState(true);
  const [name, setName]                         = useState("");
  const [email, setEmail]                       = useState("");
  const [password, setPassword]                 = useState("");
  const [confirmPassword, setConfirmPassword]   = useState("");
  const [error, setError]                       = useState("");
  const [loading, setLoading]                   = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-400">
            {isLogin ? "Sign In" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isLogin
              ? "Welcome back! Sign in to your account."
              : "Join Discarver to save your favourite cars."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-gray-300">Full name</Label>
              <Input id="name" type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white mt-1"
                placeholder="James Mitchell" />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input id="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1"
              placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input id="password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white mt-1"
              placeholder="Enter your password" />
          </div>
          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-white mt-1"
                placeholder="Confirm your password" />
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading}
            className="w-full bg-green-400 hover:bg-green-500 text-zinc-900 font-semibold py-6">
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
          <div className="text-center pt-4 border-t border-zinc-700">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={toggleMode}
                className="text-green-400 hover:text-green-500 font-semibold">
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}