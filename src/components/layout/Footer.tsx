import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark-900 text-white/80 py-12 border-t border-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Company Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-display tracking-wider text-primary-lighter">DIX</h2>
          <div className="flex flex-wrap gap-x-6 text-sm">
            <Link to="/about" className="hover:text-primary-lighter">About Us</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/press" className="hover:text-primary-lighter">Press</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/contact" className="hover:text-primary-lighter">Contact Us</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/blog" className="hover:text-primary-lighter">Blog</Link>
            <span className="text-primary-light/40">|</span>
            <a href="https://x.com/dix" className="hover:text-primary-lighter">X</a>
            <span className="text-primary-light/40">|</span>
            <a href="https://instagram.com/dix" className="hover:text-primary-lighter">Instagram</a>
          </div>
        </div>

        {/* Help/Info Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-display tracking-wider text-primary-lighter">Help/Info</h2>
          <div className="flex flex-wrap gap-x-6 text-sm">
            <Link to="/terms" className="hover:text-primary-lighter">Terms and Conditions</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/guidelines" className="hover:text-primary-lighter">Posting Guidelines</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/support" className="hover:text-primary-lighter">Support Services</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/faq" className="hover:text-primary-lighter">Help and FAQs</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/premium" className="hover:text-primary-lighter">Premium Ads</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/privacy" className="hover:text-primary-lighter">Privacy Policy</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/cookies" className="hover:text-primary-lighter">Cookie Policy</Link>
            <span className="text-primary-light/40">|</span>
            <Link to="/modern-slavery" className="hover:text-primary-lighter">Modern Slavery Statement</Link>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-display tracking-wider text-primary-lighter">Useful Links</h2>
          <div className="flex flex-wrap gap-x-6 text-sm">
            <Link to="/post-ad" className="hover:text-primary-lighter">Post your ad</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-primary-light/60 pt-8 border-t border-primary-light/10">
          <p>Copyright © {new Date().getFullYear()} DIX - Part of Digital Ventures Services Ltd</p>
        </div>
      </div>
    </footer>
  );
};