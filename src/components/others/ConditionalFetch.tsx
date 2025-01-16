import { ReactNode } from "react";

export default function ConditionalFetch({
  status,
  componentFailed,
  componentLoading,
  children,
}: {
  status: "loading" | "failed" | "success";
  componentFailed?: ReactNode;
  componentLoading?: ReactNode;
  children: ReactNode;
}) {
  if (status === "loading") return componentLoading;

  if (status === "failed") return componentFailed;

  return children;
}
