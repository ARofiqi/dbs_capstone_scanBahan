import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RekomendasiResep = () => {
  // Contoh data resep
  const resep = [
    {
      id: 1,
      nama: 'Nasi Goreng Spesial',
      bahan: ['nasi', 'telur', 'ayam', 'bawang'],
      waktu: '30 menit',
      kesulitan: 'Mudah'
    },
    {
      id: 2,
      nama: 'Ayam Bakar Madu',
      bahan: ['ayam', 'mad', 'kecap', 'bawang'],
      waktu: '45 menit',
      kesulitan: 'Sedang'
    },
    {
      id: 3,
      nama: 'Telur Dadar Padat',
      bahan: ['telur', 'bawang', 'garam'],
      waktu: '15 menit',
      kesulitan: 'Mudah'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Rekomendasi Resep</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resep.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Gambar Resep</span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{item.nama}</h2>
                <div className="mb-3">
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded mr-2">{item.waktu}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.kesulitan}</span>
                </div>
                <p className="text-gray-600 mb-4">Bahan: {item.bahan.join(', ')}</p>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Lihat Resep
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RekomendasiResep;