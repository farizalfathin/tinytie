import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/theme";
import { Helmet } from "react-helmet-async";

export default function SettingAccount() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Helmet>
        <title>Pengaturan Akun | TinyTie</title>
        <meta
          name="description"
          content="Atur tampilan akun TinyTie Anda, termasuk mode terang dan gelap."
        />
        <meta property="og:title" content="Pengaturan Akun | TinyTie" />
        <meta
          property="og:description"
          content="Atur tampilan akun TinyTie Anda, termasuk mode terang dan gelap."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex-1 flex justify-center shrink-0 ease-linear">
        <section className="w-full min-h-full border border-b-0 border-border">
          {/* Header */}
          <div className="flex items-center justify-center py-3 border-b border-border">
            <h1 className="text-lg font-semibold">Setting</h1>
          </div>
          <div className="w-full p-6">
            <div className="flex items-center justify-between rounded-lg">
              <Label className="text-base">Dark Mode</Label>
              <Switch
                checked={theme === "dark" ? true : false}
                onCheckedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
