import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | PPKPT",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout min-h-screen bg-slate-950 text-white">
      {children}
    </div>
  );
}
