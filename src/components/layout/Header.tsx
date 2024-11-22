import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { CircleUserRound, Menu, X, Sparkles, Star } from 'lucide-react';
import { signInWithGoogle, logOut } from '../../lib/services/auth';
import { auth } from '../../lib/firebase';

export const Header = () => {
  const { user, setAuth, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUserClick = () => {
    setIsAuthModalOpen(true);
    setError(null);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setError(null);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      const userData = await signInWithGoogle();
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        setAuth(userData, token);
        closeAuthModal();
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-dark-900 via-primary-dark to-dark-900 backdrop-blur-md border-b border-primary-light/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleUserClick}
                className="p-2 rounded-full hover:bg-white/5 transition-all duration-300 group"
                aria-label="User menu"
              >
                <CircleUserRound className="w-6 h-6 text-primary-lighter group-hover:scale-110 transform transition-all duration-300" />
              </button>
            </div>

            <Link to="/" className="flex items-center group perspective-1000">
              <div className="relative flex items-center transform transition-all duration-500 group-hover:scale-110">
                <Star className="absolute -left-8 -top-4 w-5 h-5 text-primary-lighter opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-12" />
                <Sparkles className="absolute -left-6 -top-3 w-4 h-4 text-primary-lighter opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <span className="text-3xl font-display tracking-wider bg-gradient-to-r from-primary-lighter via-white to-primary-lighter bg-clip-text text-transparent relative">
                  DIX
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-lighter to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                </span>
                <Sparkles className="absolute -right-6 -top-3 w-4 h-4 text-primary-lighter opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Star className="absolute -right-8 -top-4 w-5 h-5 text-primary-lighter opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-12" />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-lighter/0 via-primary-lighter/20 to-primary-lighter/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              </div>
            </Link>

            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-white/5 transition-all duration-300 group"
                aria-label="Main menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-primary-lighter group-hover:scale-110 transform transition-all duration-300" />
                ) : (
                  <Menu className="w-6 h-6 text-primary-lighter group-hover:scale-110 transform transition-all duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 bg-dark-900/95 backdrop-blur-lg border-b border-primary-light/10">
              <div className="py-2 space-y-1">
                {user ? (
                  <>
                    <Link
                      to={`/${user.role.toLowerCase()}/dashboard`}
                      className="block px-4 py-2 text-primary-lighter hover:bg-white/5 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-primary-lighter hover:bg-white/5 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-primary-lighter hover:bg-white/5 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-primary-lighter hover:bg-white/5 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <button
                      onClick={handleGoogleSignIn}
                      className="block w-full text-left px-4 py-2 text-primary-lighter hover:bg-white/5 transition-all duration-300"
                    >
                      Sign in with Google
                    </button>
                    <Link
                      to="/advertising/create"
                      className="block px-4 py-2 text-primary-lighter hover:bg-white/5 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Start Advertising
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeAuthModal}
        >
          <div 
            className="bg-gradient-to-b from-dark-800 to-dark-900 rounded-lg max-w-md w-full p-6 border border-primary-light/20 animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-lighter to-primary-light bg-clip-text text-transparent">
                Welcome
              </h2>
              <button
                onClick={closeAuthModal}
                className="text-primary-lighter hover:text-primary-light transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-3 px-4 bg-white text-gray-900 rounded-md text-center font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>

              <Link
                to="/login"
                className="block w-full py-3 px-4 glass-effect hover:bg-white/10 text-primary-lighter rounded-md text-center font-medium transition-all duration-300 hover:scale-105"
                onClick={closeAuthModal}
              >
                Sign In with Email
              </Link>

              <Link
                to="/signup"
                className="block w-full py-3 px-4 glass-effect hover:bg-white/10 text-primary-lighter rounded-md text-center font-medium transition-all duration-300 hover:scale-105"
                onClick={closeAuthModal}
              >
                Create Account
              </Link>

              <div className="text-center">
                <Link
                  to="/advertising/create"
                  className="text-primary-lighter hover:text-primary-light transition-colors duration-300"
                  onClick={closeAuthModal}
                >
                  Start Advertising
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16"></div>
    </>
  );
};