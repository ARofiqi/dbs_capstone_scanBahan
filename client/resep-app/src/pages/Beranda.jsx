import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bgimage from '../assets/bgimage.png';
import kamera from '../assets/mdi-light_camera.png';
import upload from '../assets/iconupload.png';
import cari from '../assets/pencarian.png';
import beras from '../assets/beras.png';
import telur from '../assets/telur.png';
import sayur from '../assets/sayur.png';
import bawang from '../assets/bawang.png';
import nasgor from '../assets/nasgor.png';

const Beranda = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 py-12 md:px-10 lg:px-20 md:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center">
            {/* Left Content */}
            <div className="flex-1 w-full lg:w-auto">
              <img 
                src={bgimage} 
                alt="Ilustrasi Scan Bahan" 
                className="object-contain w-72 max-w-md mx-auto lg:mx-0" 
              />
              <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-4 text-center lg:text-left">
                Pindai dan Analisis Bahan dengan Cepat dan Akurat
              </h3>
              <div className="flex justify-center lg:justify-start">
                <button className="bg-primary p-2 px-6 flex gap-2 rounded-md hover:bg-green-700 transition">
                  <span className="text-white font-medium">Mulai Pindai</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full border max-w-md shadow-lg flex flex-col items-center justify-center text-center p-6 rounded-lg bg-white h-96 md:h-[500px] lg:h-[400px]">
              <img 
                src={kamera} 
                alt="Icon Kamera" 
                className="object-contain mb-4 w-16 h-16" 
              />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Mulai Pindai</h3>
              <p className="mb-4 text-gray-600">atau</p>
              <button className="bg-primary p-2 px-4 flex gap-2 rounded-md hover:bg-green-700 transition w-full justify-center">
                <img 
                  src={upload} 
                  alt="Icon Upload" 
                  className="object-contain w-5 h-5" 
                />
                <span className="text-white font-medium">Unggah Bahan</span>
              </button>
              <p className="mt-2 text-sm text-gray-500">Drop File</p>
            </div>

          </div>
        </section>

        {/* Search Section */}
        <section className="bg-primary">
          <div className="w-full h-18 flex items-center justify-center gap-2 py-4">
            <img 
              src={cari} 
              alt="Icon Pencarian" 
              className="w-6 md:w-8 object-contain" 
            />
            <h1 className="text-white text-lg md:text-2xl font-medium">
              Temukan Resep Makanannya
            </h1>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="px-4 py-12 md:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center">
            {/* Ingredients Grid */}
            <div className="flex-1 w-full max-w-md grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md bg-white">
              <img 
                src={beras} 
                alt="Beras" 
                className="object-contain w-full h-32 md:h-40" 
              />
              <img 
                src={telur} 
                alt="Telur" 
                className="object-contain w-full h-32 md:h-40" 
              />
              <img 
                src={sayur} 
                alt="Sayur" 
                className="object-contain w-full h-32 md:h-40" 
              />
              <img 
                src={bawang} 
                alt="Bawang" 
                className="object-contain w-full h-32 md:h-40" 
              />
            </div>
            
            {/* CTA Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-4 justify-center text-center">
                <label className="text-white text-lg md:text-2xl font-medium bg-primary p-2 px-6 rounded-md transition">Foto Bahan</label>
              <h3 className="text-lg md:text-2xl">makanan apapun itu</h3>
            </div>
          </div>
        </section>

        {/* Recipes Section */}
        <section className="py-12 md:py-20 px-4 md:px-10 lg:px-20 bg-gray-50">
          {/* Section Title */}
          <div className="flex flex-col sm:flex-row gap-2 mb-8 md:mb-10 items-center">
            <h1 className="text-white text-xl md:text-2xl bg-primary p-2 rounded-md whitespace-nowrap">
              Dapatkan
            </h1>
            <h3 className="text-lg md:text-2xl text-center sm:text-left">
              berbagai macam resepnya sekarang juga
            </h3>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
              >
                <img
                  src={nasgor}
                  alt={`Resep ${index + 1}`}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h2 className="text-md md:text-lg font-medium mb-2">
                    Nasi Goreng Telur Caisim
                  </h2>
                  <div className="flex justify-end mt-2">
                    <span className="text-sm hover:underline cursor-pointer flex items-center gap-1">
                      Read More <span>&gt;</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-20 px-4 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12">
            {/* Left Side - Text */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ada Pertanyaan atau Masukan?
              </h2>
              <p className="text-gray-700 mb-4">
                Kami di <strong>ScanBahan</strong> selalu siap mendengar dari Anda! Apakah Anda mengalami kendala, ingin memberikan masukan, atau hanya sekadar berbagi ide? Jangan ragu untuk menghubungi kami.
              </p>
              <p className="text-gray-700">
                Kirimkan pesan Anda melalui formulir ini, dan tim kami akan merespons secepat mungkin. Terima kasih sudah menjadi bagian dari komunitas <strong>ScanBahan</strong>!
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-md">
              <form className="flex flex-col space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Nama</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan email Anda"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Pesan</label>
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tulis pesan Anda..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-green-700 transition font-medium"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Beranda;