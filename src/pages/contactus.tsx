import LayoutSidebar from "@/components/templates/LayoutSidebar";

export default function ContactUs() {
  return (
    <LayoutSidebar>
      <div className="flex justify-center shrink-0 ease-linear py-4">
        <div className="w-[468px]">
          <main>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Introduksi</h2>
              <p>
                Lahelu didirikan dengan satu misi yaitu menyediakan sebuah wadah
                untuk menyalurkan meme, komedi dan hiburan secara gratis dan
                demokrat. Gabung Lahelu sekarang sebagai pengguna komunitas meme
                terbesar di dunia!
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Kerjasama</h2>
              <p>
                Bila ada pemasangan iklan & sponsor, endorsement, atau penawaran
                oportunitas bisnis lainnya bisa hubungi email kami:
                business@lahelu.com
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Lapor & Saran</h2>
              <p>
                Untuk melapor bug, permasalahan, dan rekomendasi fitur silahkan
                hubungi email kami: support@lahelu.com
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">Discord</h2>
              <p>
                Para pengguna Discord bisa gabung ke server official Lahelu agar
                mempermudah komunikasi: https://discord.gg/lahelu
              </p>
            </div>
          </main>
        </div>
      </div>
    </LayoutSidebar>
  );
}
