import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Syarat dan Ketentuan - TinyTie</title>
        <meta
          name="description"
          content="Baca dan pahami syarat dan ketentuan penggunaan platform TinyTie, termasuk kebijakan konten, tanggung jawab pengguna, dan hak kami dalam mengelola platform."
        />
        <meta property="og:title" content="Syarat dan Ketentuan - TinyTie" />
        <meta
          property="og:description"
          content="Baca dan pahami syarat dan ketentuan penggunaan platform TinyTie, termasuk kebijakan konten, tanggung jawab pengguna, dan hak kami dalam mengelola platform."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tinytie.com/terms-of-service"
        />
      </Helmet>
      <div className="flex justify-center shrink-0 ease-linear">
        <section className="w-full p-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Introduksi</h2>
            <p>
              TinyTie adalah sebuah tempat menyalurkan aktivitas, hiburan,
              status harian dan komunikasi yang bersifat positif terhadap warga
              Indonesia atau lebih luas. TinyTie memiliki komunitas pengawasan,
              serta admin yang bisa menghapus post yang melanggar aturan. Akun
              TinyTie yang terus menerus melanggar akan di blokir hingga di ban
              secara permanen. Temukan peraturan dibawah yang harus dipatuhi
              saat menggunakan TinyTie.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Cara Guna</h2>
            <p>
              Platform ini disediakan untuk berbagi dan melihat aktivitas,
              hiburan, status harian dan komunikasi. Pengguna diharapkan untuk
              menggunakan platform dengan bertanggung jawab dan sesuai dengan
              peraturan yang berlaku.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Konten Pengguna</h2>
            <p>
              Anda bertanggung jawab atas konten yang Anda unggah. Dengan
              mengunggah konten, Anda memberi kami hak non-eksklusif, bebas
              royalti, dan lisensi untuk menggunakan, menyebarkan, dan
              memodifikasi konten tersebut untuk tujuan operasional platform.
              Kami melaporkan konten tersebut ke pihak berwenang jika diperlukan
              ataupun berhak untuk menghapus konten yang mengandung hal berbau
              seperti brikut ini :
            </p>
            <ul className="flex flex-col gap-4 mt-2 ms-5 list-disc">
              <li>
                <h3 className="font-medium">Pornografi/pedofilia</h3>
                <span className="text-sm">
                  Dilarang menyebarkan konten yang berisi alat vital,
                  ketelanjangan, pedofilia, dan hal-hal yang bersifat seksual.
                </span>
              </li>
              <li>
                <h3 className="font-medium">Kekerasan/gore</h3>
                <span className="text-sm">
                  Dilarang menyebarkan konten orang terluka/mayat, tindakan
                  kekerasan/penyiksaan terhadap mahluk hidup,
                  penggunaan/pembuatan senjata semena-mena, dan konten grafis
                  yang menjijikan.
                </span>
              </li>
              <li>
                <h3 className="font-medium">Pengotoran agama/ras/suku</h3>
                <span className="text-sm">
                  Dilarang melakukan pengejekan atau sindiran terhadap agama,
                  ras, atau suku dalam bentuk apapun.
                </span>
              </li>
              <li>
                <h3 className="font-medium">Memicu drama</h3>
                <span className="text-sm">
                  Dilarang mencoba untuk membuat keributan, penyerangan suatu
                  pihak, pengotoran nama baik, usaha membuat peperangan, dan
                  penggunaan bahasa yang terlalu eksplisit.
                </span>
              </li>
              <li>
                <h3 className="font-medium">Penyalahgunaan platform</h3>
                <span className="text-sm">
                  Dilarang: (1) Promosi produk/jasa illegal atau yang melanggar
                  aturan di TinyTie, (2) Eksploitasi sistem untuk kepentingan
                  pribadi, seperti mendapatkan upvote/saweran ilegal, (3)
                  Tindakan mengemis, (4) Menyolong karya, postingan atau apapun
                  itu milik user lain.
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Batas Tanggung Jawab</h2>
            <p>
              Kami tidak bertanggung jawab atas kerugian atau kerusakan yang
              timbul dari penggunaan platform, termasuk namun tidak terbatas
              pada kesalahan teknis, akses tidak sah, atau kehilangan data. Kami
              tidak bertanggung jawab atas konten yang diunggah oleh pengguna
              lain di platform ini.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Perubahan Syarat</h2>
            <p>
              Kami dapat mengubah Syarat dan Ketentuan ini kapan saja. Perubahan
              akan diberlakukan saat diumumkan di platform. Anda diharapkan
              untuk memeriksa syarat ini secara berkala.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
