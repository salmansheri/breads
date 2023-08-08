import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breads",
  description: "Threads Clone",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-1 ">
      {children}
    </div>
  );
}
