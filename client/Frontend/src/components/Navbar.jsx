import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoscanbahan.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Baris utama navbar */}
        <div className="flex justify-between items-center">
          {/* Logo dan nama brand */}
          <div className="flex items-center gap-1">
            <img src={logo} alt="Logo ScanBahan" className="w-10 md:w-14 object-contain" />
            <Link to="/" className="text-xl md:text-2xl">ScanBahan</Link>
          </div>

          {/* Menu untuk desktop (md ke atas) */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition py-1 px-2">Beranda</Link>
            <Link to="/pindai-bahan" className="hover:text-green-200 transition py-1 px-2">Pindai Bahan</Link>
            <Link to="/rekomendasi-resep" className="hover:text-green-200 transition py-1 px-2">Rekomendasi Resep</Link>
            <Link to="/tentang-kami" className="hover:text-green-200 transition py-1 px-2">Tentang Kami</Link>
          </div>

          {/* Tombol login/daftar untuk desktop */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="hover:text-green-200 transition py-1 px-2">Login</Link>
            <Link to="/daftar" className="bg-white text-green-600 px-4 py-1 rounded hover:bg-green-100 transition">Daftar</Link>
          </div>

          {/* Tombol hamburger untuk mobile */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile yang bisa di-toggle */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 pb-4`}>
          <div className="flex flex-col">
            <Link 
              to="/" 
              className="hover:text-green-200 transition py-2 px-3 rounded hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              to="/pindai-bahan" 
              className="hover:text-green-200 transition py-2 px-3 rounded hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Pindai Bahan
            </Link>
            <Link 
              to="/rekomendasi-resep" 
              className="hover:text-green-200 transition py-2 px-3 rounded hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Rekomendasi Resep
            </Link>
            <Link 
              to="/tentang-kami" 
              className="hover:text-green-200 transition py-2 px-3 rounded hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>
          </div>
          
          <div className="flex flex-col space-y-1 mt-4 pt-4 border-t border-white">
            <Link 
              to="/login" 
              className="text-center hover:text-green-200 transition py-2 px-3 rounded hover:bg-green-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/daftar" 
              className="text-center bg-white text-green-600 py-2 px-3 rounded hover:bg-green-100 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;