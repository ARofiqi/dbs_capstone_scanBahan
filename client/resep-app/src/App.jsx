import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Beranda from './pages/Beranda';
import PindaiBahan from './pages/PindaiBahan';
import RekomendasiResep from './pages/RekomendasiResep';
import TentangKami from './pages/TentangKami';
import Login from './pages/Login';
import Daftar from './pages/Daftar';

// Tambahan halaman deteksi dan resep
import DeteksiBahan from './pages/DeteksiBahan';
import DetailResep from './pages/DetailResep';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/pindai-bahan" element={<PindaiBahan />} />
        <Route path="/rekomendasi-resep" element={<RekomendasiResep />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />

        {/* Halaman tambahan */}
        <Route path="/deteksi-bahan" element={<DeteksiBahan />} />
        <Route path="/detail-resep/:id" element={<DetailResep />} />
      </Routes>
    </Router>
  );
}

export default App;
