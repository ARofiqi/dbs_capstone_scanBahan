import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import nasgor from '../assets/nasgor.png';

const DetailResep = () => {
  const navigate = useNavigate();

  // Dummy data bahan pencarian sebelumnya
  const bahanPencarian = ['Beras', 'Telur', 'Sayur', 'Bawang'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Tombol Kembali */}
          <button
            onClick={() => navigate('/deteksi-bahan')}
            className="mb-6 bg-primary hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded"
          >
            ← Kembali ke Pencarian Resep
          </button>

          {/* Bahan sebelumnya */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Bahan dari pencarian sebelumnya:</h3>
            <div className="flex flex-wrap gap-2">
              {bahanPencarian.map((bahan, index) => (
                <span
                  key={index}
                  className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full"
                >
                  {bahan}
                </span>
              ))}
            </div>
          </div>

          {/* Detail Resep */}
          <img src={nasgor} alt="Nasi Goreng" className="w-full h-64 object-cover rounded mb-4" />
          <h2 className="text-3xl font-bold mb-4">Nasi Goreng Telur Caisim</h2>

          <h3 className="text-xl font-semibold mb-2">Bahan-bahan:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Nasi</li>
            <li>Telur</li>
            <li>Bawang merah dan putih</li>
            <li>Caisim (sawi hijau)</li>
            <li>Garam dan penyedap</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Langkah-langkah:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Tumis bawang hingga harum.</li>
            <li>Masukkan telur dan orak-arik.</li>
            <li>Tambahkan nasi dan caisim, aduk rata.</li>
            <li>Tambahkan bumbu sesuai selera, masak hingga matang.</li>
          </ol>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailResep;
