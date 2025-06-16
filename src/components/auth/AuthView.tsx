import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A23AFF]/5 via-transparent to-[#FF6B9D]/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A23AFF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B9D]/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#A23AFF] rounded-3xl mb-6 shadow-2xl shadow-[#A23AFF]/30">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#2C2C2C] mb-2">DataSight AI</h1>
          <p className="text-[#666666] text-lg">Transform data into executive insights</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/80 backdrop-blur-xl border border-[#A23AFF]/20 rounded-3xl shadow-2xl shadow-[#A23AFF]/10 p-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A23AFF]/5 via-transparent to-[#FF6B9D]/5" />
          
          <div className="relative z-10">
            {/* Tabs */}
            <div className="flex mb-8 bg-[#F8F6F2] rounded-2xl p-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-center font-semibold rounded-xl transition-all duration-300 ${
                  isLogin
                    ? 'bg-[#A23AFF] text-white shadow-lg shadow-[#A23AFF]/30'
                    : 'text-[#666666] hover:text-[#A23AFF]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-center font-semibold rounded-xl transition-all duration-300 ${
                  !isLogin
                    ? 'bg-[#A23AFF] text-white shadow-lg shadow-[#A23AFF]/30'
                    : 'text-[#666666] hover:text-[#A23AFF]'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-[#A23AFF]/20 rounded-xl focus:ring-2 focus:ring-[#A23AFF] focus:border-[#A23AFF] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-[#A23AFF]/20 rounded-xl focus:ring-2 focus:ring-[#A23AFF] focus:border-[#A23AFF] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-[#A23AFF]/20 rounded-xl focus:ring-2 focus:ring-[#A23AFF] focus:border-[#A23AFF] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#A23AFF] border-[#A23AFF]/30 rounded focus:ring-[#A23AFF]"
                    />
                    <span className="ml-2 text-sm text-[#666666]">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[#A23AFF] hover:text-[#FF6B9D] font-semibold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#A23AFF] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#FF6B9D] hover:shadow-lg hover:shadow-[#A23AFF]/30 hover:scale-105 transition-all duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#666666] mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};