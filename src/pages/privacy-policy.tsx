import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Kebijakan Privasi - TinyTie</title>
        <meta
          name="description"
          content="Pelajari bagaimana TinyTie mengumpulkan, menggunakan, dan melindungi informasi pribadi pengguna sesuai dengan kebijakan privasi kami."
        />
        <meta property="og:title" content="Kebijakan Privasi - TinyTie" />
        <meta
          property="og:description"
          content="Pelajari bagaimana TinyTie mengumpulkan, menggunakan, dan melindungi informasi pribadi pengguna sesuai dengan kebijakan privasi kami."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinytie.com/privacy-policy" />
      </Helmet>
      <div className="flex justify-center shrink-0 ease-linear">
        <section className="w-full p-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Introduksi</h2>
            <p>
              TinyTie berkomitmen untuk melindungi privasi dan keamanan
              informasi pribadi pengguna platform kami. Kebijakan privasi ini
              menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan,
              dan melindungi informasi Anda saat menggunakan platform.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Informasi yang dikumpulkan</h2>
            <p>
              Informasi probadi: Kami dapat mengumpulkan informasi pribadi yang
              Anda berikan secara sukarela, termasuk nama, alamat email, dan
              informasi profil. Data aktivitas: Kami mengumpulkan informasi
              terkait aktivitas Anda di platform, seperti postingan atau status
              yang Anda unggah, komentar, atau interaksi dengan pengguna lain.
              Informasi Perangkat: Kami mengumpulkan data teknis dari perangkat
              Anda, termasuk alamat IP, jenis perangkat, dan sistem operasi.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Pengunaan informasi</h2>
            <p>
              Kami menggunakan informasi Anda untuk: (1) Menyediakan dan
              mengoperasikan aplikasi, (2) Meningkatkan pengalaman pengguna
              melalui personalisasi konten, (3) Mengirimkan notifikasi atau
              pembaruan terkait layanan kami, (4) Memantau dan mencegah
              aktivitas yang melanggar kebijakan kami, seperti penyalahgunaan
              atau konten yang tidak pantas.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Berbagi informasi</h2>
            <p>
              Kami tidak akan menjual, menyewakan, atau membagikan informasi
              pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali
              dalam kondisi berikut: (1) Untuk memenuhi kewajiban hukum, (2)
              Untuk melindungi hak dan keamanan pengguna atau pihak lain, (3)
              Dalam hal akuisisi atau merger perusahaan.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Keamanan informasi</h2>
            <p>
              Kami menggunakan langkah-langkah keamanan yang tepat untuk
              melindungi informasi pribadi Anda dari akses yang tidak sah,
              penyalahgunaan, atau pengungkapan. Namun, tidak ada sistem yang
              benar-benar aman, sehingga kami tidak dapat menjamin keamanan
              absolut.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Hak pengguna</h2>
            <p>
              Anda berhak untuk mengakses dan memperbarui informasi pribadi Anda
              kapan saja melalui pengaturan akun Anda. Untuk penghapusan akun,
              silahkan hubungi email kami di halaman kontak.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Pembatasan usia</h2>
            <p>
              Aplikasi kami tidak diperuntukkan bagi pengguna di bawah usia 13
              tahun. Kami tidak mengumpulkan informasi secara sengaja dari
              anak-anak di bawah usia tersebut. Jika Anda berusia di bawah 13
              tahun, harap tinggalkan platform ini dan jangan memberikan
              informasi pribadi kepada kami.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
