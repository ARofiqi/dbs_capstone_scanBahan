const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany({});

  const recipes = [
    {
      title: "Ayam Woku Manado",
      ingredients:
        "1 Ekor Ayam Kampung (potong 12)--2 Buah Jeruk Nipis--2 Sdm Garam--3 Ruas Kunyit--7 Bawang Merah--7 Bawang Putih--10 Cabe Merah--10 Cabe Rawit Merah (sesuai selera)--3 Butir Kemiri--2 Batang Sereh--2 Lembar Daun Salam--2 Ikat Daun Kemangi--Penyedap Rasa--1 1/2 Gelas Air--",
      steps:
        "1) Cuci bersih ayam dan tiriskan. Lalu peras jeruk nipis (kalo gak ada jeruk nipis bisa pake cuka) dan beri garam. Aduk hingga merata dan diamkan selama 5 menit, biar ayam gak bau amis.\n2) Goreng ayam tersebut setengah matang, lalu tiriskan\n3) Haluskan bumbu menggunakan blender. Bawang merah, bawang putih, cabe merah, cabe rawit, kemiri dan kunyit. Oh iya kasih minyak sedikit yaa biar bisa di blender. Untuk sereh nya di geprek aja terus di buat simpul.\n4) Setelah bumbu di haluskan barulah di tumis. Jangan lupa sereh dan daun salamnya juga ikut di tumis. Di tumis sampai berubah warna ya\n5) Masukan ayam yang sudah di goreng setengah matang ke dalam bumbu yang sudah di tumis, dan diamkan 5 menit dulu. Biar bumbu meresap. Lalu tuangkan 1 1/2 Gelas air. Lalu tambahkan penyedap rasa (saya 3 Sdt, tapi sesuai selera ya) koreksi rasa dan Biar kan sampai mendidih\n6) Setelah masakan mendidih, lalu masukan daun kemangi yang sudah di potong potong. Masak lagi sekitar 10 menit. And taraaaaaaaaaaaaaa..... jadi deh Ayam Woku Manadonya.\n7) Oh iyaa kalo mau di tambahkan potongan tomat merah juga bisa ko. Sesuai selera aja yaa buibuuuu",
      image: null,
    },
    {
      title: "Ayam goreng tulang lunak",
      ingredients:
        "1 kg ayam (dipotong sesuai selera jangan kecil2 ya)--2 batang serai (memarkan)--4 lembar daun jeruk--7 butir bawang putih (haluskan)--1 sdm ketumbar (haluskan)--3 ruas jari Laos (haluskan)--3 ruas jari kunyit (haluskan)--2 butir kemiri (haluskan)--secukupnya Garam--Secukupnya Air (tuk ukep ayam)--Secukupnya Minyak goreng--",
      steps:
        "1) Haluskan bumbu2nya (BaPut, ketumbar, kemiri, kunyit, Laos, garam) hingga halus, sisihkan\n2) Campur kan bumbu halus tadi dengan ayam yg sudah dicuci bersih dan sudah dipotong didalam panci presto. Uleni sampai tercampur rata.\n3) Tambahkan air hingga ayam tenggelam semua. Masukkan serai dan daun jeruk nya kedalam rendaman ayam. Tutup panci presto rebus/ ukep presto sampai kurleb 45 menit. Dengan api sedang.\n4) Setelah proses ukep presto selesai, tunggu suhu dingin ruang. Lalu goreng ayam dengan minyak goreng api sedang sampai ayam berwarna kecoklatan.\n5) Matang dan sajikan ayam selagi hangat bersama nasi putih, sambal dgn perasan jeruk nipis, lalapan.",
      image: null,
    },
    {
      title: "Ayam cabai kawin",
      ingredients: "1/4 kg ayam--3 buah cabai hijau besar--7 buah cabai merah rawit--3 siung bawang putih--2 siung bawang merah--secukupnya Gula--secukupnya Garam--1/4 buah tomat merah--secukupnya Air--secukupnya Minyak goreng--",
      steps:
        "1) Panaskan minyak di dalam wajan. Setelah minyak panas masukkan ayam yang sudah dipotong dadu. Goreng hingga matang. Lalu tiriskan.\n2) Haluskan bawang putih, bawang merah, cabai hijau dan merah, tomat.\n3) Panaskan minyak didalam wajan. Setelah minyak panas, masukkan bumbu yang sudah halus. Tunggu sampai wangi. Masukkan ayam yang sudah di goreng. Tambahkan air, gula dan garam. Tunggu sampai bumbu meresap di ayam. Sajikan.",
      image: null,
    },
    {
      title: "Ayam Geprek",
      ingredients:
        "250 gr daging ayam (saya pakai fillet)--Secukupnya gula dan garam--50-100 gr tepung ayam serbaguna--Secukupnya lalapan (kemangi,kol,timun)--Secukupnya minyak panas--❤sambal korek--Secukupnya cabe rawit merah dan bwg putih--",
      steps: "1) Goreng ayam seperti ayam krispi\n2) Ulek semua bahan sambal kemudian campur dengan minyak panas bekas goreng ayam\n3) Geprek ayam kemudian campur dengan sambal,sajikan dengan lalapan",
      image: null,
    },
    {
      title: "Minyak Ayam",
      ingredients: "400 gr kulit ayam & lemaknya--8 siung bawang putih kating, cincang kasar--1 ruas jahe, geprek--350 ml minyak goreng--1 sdm ketumbar bubuk--",
      steps: "1) Cuci bersih kulit ayam. Sisihkan\n2) Ambil 50 ml minyak goreng satu bahan yg sudah disiapkan tadi. Tumis jahe hingga harum.",
      image: null,
    },
  ];

  for (const recipeData of recipes) {
    await prisma.recipe.create({
      data: recipeData,
    });
  }

  console.log("Seeder completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
