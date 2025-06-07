import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logoscanbahan.png';
import { FaX, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Kiri */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="ScanBahan Logo" className="w-12" />
              <h3 className="text-xl font-bold">ScanBahan</h3>
            </div>
            <p className="mb-4">
              ScanBahan adalah website berbasis AI yang membantu Anda mengenali bahan makanan
              dan menemukan resep kreatif dengan mudah.
            </p>
            <div className="mb-4">
              <p><strong>Dukungan:</strong></p>
              <p>Email: <a href="mailto:support@scanbahan.com" className="hover:underline">support@scanbahan.com</a></p>
              <p>Telepon: +62 812-3456-7890</p>
            </div>
            <div>
              <p className="mb-2"><strong>Sosial Media:</strong></p>
              <div className="flex gap-4 text-xl">
                <a href="#"><FaXTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaYoutube /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Navigasi Utama</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Beranda</a></li>
              <li><a href="/pindai-bahan" className="hover:underline">Pindai Bahan</a></li>
              <li><a href="/rekomendasi-resep" className="hover:underline">Rekomendasi Resep</a></li>
              <li><a href="/tentang-kami" className="hover:underline">Tentang Kami</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 mt-10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ScanBahan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
