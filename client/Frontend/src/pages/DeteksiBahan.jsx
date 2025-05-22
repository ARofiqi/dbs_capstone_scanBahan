import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import beras from '../assets/beras.png';
import telur from '../assets/telur.png';
import sayur from '../assets/sayur.png';
import bawang from '../assets/bawang.png';
import nasgor from '../assets/nasgor.png';

const DeteksiBahan = () => {
  const navigate = useNavigate();

  const [bahanTerdeteksi, setBahanTerdeteksi] = useState([
    { nama: 'Nasi Putih', img: beras },
    { nama: 'Telur', img: telur },
    { nama: 'Sayur', img: sayur },
    { nama: 'Bawang Merah', img: bawang },
  ]);

  const [tampilkanResep, setTampilkanResep] = useState(false);

  const rekomendasiResep = [
    {
      id: 1,
      judul: 'Nasi Goreng Telur Caisim',
      gambar: nasgor,
      deskripsi: 'Perpaduan sederhana antara nasi, telur, dan sayuran.',
      bahan: ['Nasi Putih', 'Telur', 'Bawang Merah', 'Sayur'],
      waktu: '30 menit',
      kesulitan: 'Mudah'
    },
    {
      id: 2,
      judul: 'Telur Dadar Sayur',
      gambar: telur,
      deskripsi: 'Telur dadar dengan campuran sayuran segar.',
      bahan: ['Telur', 'Sayur', 'Bawang Merah'],
      waktu: '15 menit',
      kesulitan: 'Mudah'
    },
    {
      id: 3,
      judul: 'Nasi Goreng Spesial',
      gambar: nasgor,
      deskripsi: 'Nasi goreng dengan berbagai bahan pelengkap.',
      bahan: ['Nasi Putih', 'Telur', 'Bawang Merah', 'Sayur'],
      waktu: '40 menit',
      kesulitan: 'Sedang'
    }
  ];

  const handleHapus = (nama) => {
    setBahanTerdeteksi(bahanTerdeteksi.filter((b) => b.nama !== nama));
  };

  const handleTambahBahan = () => {
    // Dummy bahan tambahan
    const bahanBaru = { 
      nama: 'Cabe', 
      img: sayur 
    };
    setBahanTerdeteksi([...bahanTerdeteksi, bahanBaru]);
  };

  const handleCariResep = () => {
    setTampilkanResep(true);
    // Scroll ke bagian rekomendasi resep
    setTimeout(() => {
      const element = document.getElementById('rekomendasi-resep');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Judul Halaman */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Informasi Bahan yang Terdeteksi
        </h1>

        {/* Bahan terdeteksi */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {bahanTerdeteksi.map((item, index) => (
            <div 
              key={index} 
              className="relative bg-white p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center"
            >
              <button
                className="absolute top-1 right-1 text-red-500 hover:text-red-700 font-bold text-sm md:text-base"
                onClick={() => handleHapus(item.nama)}
                aria-label={`Hapus ${item.nama}`}
              >
                ✖
              </button>
              <img 
                src={item.img} 
                alt={item.nama} 
                className="object-contain mb-2" 
              />
              <div className="flex flex-col items-center">
                <span className="text-xs md:text-sm text-gray-500 mb-1">Terdeteksi:</span>
                <span className="bg-primary px-2 py-1 rounded-md text-white text-xs md:text-sm text-center">
                  {item.nama}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button
            onClick={handleTambahBahan}
            className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition flex-1 sm:flex-none"
          >
            + Tambah Bahan
          </button>
          <button
            onClick={handleCariResep}
            className="bg-orange-400 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow transition flex-1 sm:flex-none"
          >
            🔍 Cari Resep
          </button>
        </div>

        {/* Rekomendasi Resep */}
        {tampilkanResep && (
          <div id="rekomendasi-resep" className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
              Rekomendasi Resep
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rekomendasiResep
                .filter(resep => 
                  resep.bahan.every(bahan => 
                    bahanTerdeteksi.some(b => b.nama === bahan)
                  )
                )
                .map((resep) => (
                  <div
                    key={resep.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/detail-resep/${resep.id}`)}
                  >
                    <img 
                      src={resep.gambar} 
                      alt={resep.judul} 
                      className="w-full h-48 md:h-56 object-cover" 
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg md:text-xl font-semibold">{resep.judul}</h3>
                        <div className="flex space-x-2">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {resep.waktu}
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {resep.kesulitan}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 mb-3">{resep.deskripsi}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Bahan yang cocok:</h4>
                        <div className="flex flex-wrap gap-1">
                          {resep.bahan.map((bahan, idx) => (
                            <span 
                              key={idx} 
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {bahan}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Tidak ada resep yang cocok */}
            {rekomendasiResep.filter(resep => 
              resep.bahan.every(bahan => 
                bahanTerdeteksi.some(b => b.nama === bahan)
              ).length === 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Tidak ditemukan resep yang cocok dengan semua bahan yang terdeteksi. Coba tambahkan lebih banyak bahan atau lihat resep dengan bahan yang tersedia.
                    </p>
                  </div>
                </div>
              </div>
              ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DeteksiBahan;