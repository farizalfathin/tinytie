import LayoutSidebar from "@/components/templates/LayoutSidebar";

export default function TermsOfService() {
  return (
    <LayoutSidebar>
      <div className="flex justify-center shrink-0 ease-linear py-4">
        <div className="w-[468px]">
          <main>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Introduksi</h2>
              <p>
                Lahelu adalah sebuah tempat pemberi hiburan yang bersifat
                positif terhadap warga Indonesia. Lahelu memiliki komunitas
                pengawasan, serta admin yang bisa menghapus post yang melanggar
                aturan. Akun Lahelu yang terus menerus melanggar akan di blokir
                hingga di ban secara permanen. Temukan peraturan dibawah yang
                harus dipatuhi saat menggunakan Lahelu
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Cara Guna</h2>
              <p>
                Aplikasi ini disediakan untuk berbagi dan melihat konten meme.
                Pengguna diharapkan untuk menggunakan aplikasi dengan
                bertanggung jawab dan sesuai dengan peraturan yang berlaku.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Konten Pengguna</h2>
              <p>
                Anda bertanggung jawab atas konten yang Anda unggah. Dengan
                mengunggah konten, Anda memberi kami hak non-eksklusif, bebas
                royalti, dan lisensi untuk menggunakan, menyebarkan, dan
                memodifikasi konten tersebut untuk tujuan operasional aplikasi.
                Kami melaporkan konten tersebut ke pihak berwenang jika
                diperlukan ataupun berhak untuk menghapus konten yang mengandung
                hal berbau seperti brikut ini :
              </p>
              <ul className="flex flex-col gap-4 mt-2 ms-5 list-disc">
                <li>
                  <h3 className="font-medium">Pornografi/pedofilia</h3>
                  <span className="text-sm">
                    Dilarang menyebarkan konten yang berisi alat vital,
                    ketelanjangan, pedofilia, dan hal-hal yang bersifat seksual
                  </span>
                </li>
                <li>
                  <h3 className="font-medium">Kekerasan/gore</h3>
                  <span className="text-sm">
                    Dilarang menyebarkan konten orang terluka/mayat, tindakan
                    kekerasan/penyiksaan terhadap mahluk hidup,
                    penggunaan/pembuatan senjata semena-mena, dan konten grafis
                    yang menjijikan
                  </span>
                </li>
                <li>
                  <h3 className="font-medium">Pengotoran agama/ras/suku</h3>
                  <span className="text-sm">
                    Dilarang melakukan pengejekan atau sindiran terhadap agama,
                    ras, atau suku dalam bentuk apapun
                  </span>
                </li>
                <li>
                  <h3 className="font-medium">Memicu drama</h3>
                  <span className="text-sm">
                    Dilarang mencoba untuk membuat keributan, penyerangan suatu
                    pihak, pengotoran nama baik, usaha membuat peperangan, dan
                    penggunaan bahasa yang terlalu eksplisit
                  </span>
                </li>
                <li>
                  <h3 className="font-medium">Penyalahgunaan platform</h3>
                  <span className="text-sm">
                    Dilarang: (1) Promosi produk/jasa diluar Lahelu, kecuali
                    sudah berizin, (2) Eksploitasi sistem untuk kepentingan
                    pribadi, seperti mendapatkan upvote/saweran ilegal, (3)
                    Tindakan mengemis, (4) Menyolong karya user lain
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Batas Tanggung Jawab</h2>
              <p>
                Kami tidak bertanggung jawab atas kerugian atau kerusakan yang
                timbul dari penggunaan aplikasi, termasuk namun tidak terbatas
                pada kesalahan teknis, akses tidak sah, atau kehilangan data.
                Kami tidak bertanggung jawab atas konten yang diunggah oleh
                pengguna lain di aplikasi
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Perubahan Syarat</h2>
              <p>
                Kami dapat mengubah Syarat dan Ketentuan ini kapan saja.
                Perubahan akan diberlakukan saat diumumkan di aplikasi. Anda
                diharapkan untuk memeriksa syarat ini secara berkala
              </p>
            </div>
          </main>
        </div>
      </div>
    </LayoutSidebar>
  );
}
