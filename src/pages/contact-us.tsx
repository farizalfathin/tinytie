import { Helmet } from "react-helmet-async";

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Hubungi Kami - TinyTie</title>
        <meta
          name="description"
          content="Hubungi tim TinyTie untuk kerjasama, laporan masalah, saran fitur, atau informasi kontak developer. Kami siap mendengar Anda."
        />
        <meta property="og:title" content="Hubungi Kami - TinyTie" />
        <meta
          property="og:description"
          content="Hubungi tim TinyTie untuk kerjasama, laporan masalah, saran fitur, atau informasi kontak developer. Kami siap mendengar Anda."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinytie.com/contact" />
      </Helmet>
      <div className="flex justify-center shrink-0 ease-linear">
        <section className="w-full p-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Introduksi</h2>
            <p>
              TinyTie dibuat dengan satu misi yaitu menyediakan sebuah wadah
              untuk menyalurkan aktivitas, hiburan, status harian, dan
              komunikasi antar sesama secara gratis dan terjaga. Gunakan TinyTie
              sekarang sebagai pengguna Sosial Media kekinian di dunia!
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Kerjasama</h2>
            <p>
              Bila ada pemasangan iklan & sponsor, endorsement, atau penawaran
              oportunitas bisnis lainnya bisa hubungi email kami:
              collaboration@tinytie.com
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Lapor & Saran</h2>
            <p>
              Untuk melapor bug, permasalahan, dan rekomendasi fitur silahkan
              hubungi email kami: cs.support@tinytie.com
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Kontak Pribadi Developer</h2>
            <p>
              Para pengguna Discord bisa gabung ke server official TinyTie agar
              mempermudah komunikasi: https://discord.gg/tinytie
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
