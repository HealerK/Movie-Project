import Header from "@/components/Header";
import { GenreSidebar } from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="mx-4 m-auto">
        <Header />

        <section className="flex gap-4 min-h-[500px]">
          <GenreSidebar />
          <main className="border-l border-slate-300 px-4">{children}</main>
        </section>
        <footer className="text-center py-4 text-slate-400 mt-4 border-t border-slate-300">
          <small className="text-sm">&copy; Copyright 2025</small>
        </footer>
      </div>
    </>
  );
}
