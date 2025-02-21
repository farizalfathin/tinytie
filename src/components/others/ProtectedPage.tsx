import { useAuth } from "@/context/authentication";
import { CloudAlert } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function ProtectedPage() {
  const { isAuth } = useAuth();

  if (isAuth) return <Outlet />;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-lg flex items-start gap-2 p-4 border border-zinc-200 rounded-md">
        <CloudAlert className="w-20 aspect-square" />
        <div>
          <h5 className="mb-1 font-medium leading-none tracking-tight">
            Heads Up!
          </h5>
          <div className="text-sm text-justify [&_p]:leading-relaxed">
            Jika anda ingin mengakses seluruh fitur yang ada di platform ini,
            silahkan login dengan googgle terlebih dahulu. Rasakan pengalaman
            penuh dengan menikmati aktivitas, hiburan, status harian, dan
            komunikasi secara gratis dan terjaga.
          </div>
        </div>
      </div>
    </div>
  );
}
