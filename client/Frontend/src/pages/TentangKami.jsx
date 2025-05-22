import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TentangKami = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Tentang Kami</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Visi Kami</h2>
          <p className="text-gray-700 mb-6">
            Menjadi platform terdepan dalam membantu masyarakat menemukan resep masakan berdasarkan bahan yang tersedia, 
            mengurangi food waste, dan memudahkan proses memasak sehari-hari.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
            <li>Menyediakan database resep yang lengkap dan terpercaya</li>
            <li>Mengembangkan teknologi pemindaian bahan makanan yang akurat</li>
            <li>Memberikan rekomendasi resep yang personal dan sesuai selera</li>
            <li>Mendorong gaya hidup sehat melalui masakan rumahan</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Head of Product</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Michael Johnson</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TentangKami;