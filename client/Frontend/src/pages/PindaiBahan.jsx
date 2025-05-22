import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import kamera from '../assets/mdi-light_camera.png';
import upload from '../assets/iconupload.png';
import { useNavigate } from 'react-router-dom';

const PindaiBahan = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    // Logika upload file bisa ditambahkan di sini
    navigate('/deteksi-bahan');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="flex gap-1">
            <h3 className="text-xl mb-2">Temukan</h3>
            <h3 className="text-sm bg-primary p-1 px-2 rounded-md text-white mb-2">Resep Makanan</h3>
          </div>
          <h3 className="text-xl mb-2">hanya dengan scan bahan makanan</h3>
            <img src={kamera} alt="Logo ScanBahan" className="object-contain mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mulai Pindai</h3>
              <h3 className="mb-2">atau</h3>
               <button onClick={handleUpload} className="bg-primary p-2 flex gap-2 rounded-md">
                <img src={upload} alt="Logo ScanBahan" className="object-contain" />
                <h1 className="text-white">Unggah Bahan</h1>
              </button>
              <h3 className="mb-2 mt-1">Drop File</h3>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PindaiBahan;