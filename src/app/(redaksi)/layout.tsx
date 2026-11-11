import Link from "next/link";
import { LayoutDashboard, PenLine, ExternalLink, ShieldCheck, Newspaper } from "lucide-react";

export default function RedaksiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col md:flex-row">
      {/* Editorial CMS Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-100 flex flex-col flex-shrink-0 border-r border-stone-800">
        {/* Masthead Header */}
        <div className="p-5 border-b border-stone-800">
          <Link href="/dashboard" className="block">
            <span className="font-serif text-2xl font-black tracking-tight text-white block">
              KRONIKA
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 block mt-0.5">
              Sistem Manajemen Redaksi
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-grow font-mono text-xs uppercase tracking-wider">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-stone-400" />
            <span>Semua Berita</span>
          </Link>

          <Link
            href="/dashboard/tulis"
            className="flex items-center gap-3 px-3 py-2.5 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
          >
            <PenLine className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
          </Link>

          <div className="pt-4 pb-2 text-[10px] text-stone-500 font-bold uppercase tracking-widest px-3">
            Akses Publik
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka Portal Web →</span>
          </Link>
        </nav>

        {/* User Identity & System Footprint */}
        <div className="p-4 border-t border-stone-800 space-y-3 font-mono text-[11px] text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-white font-bold">Taufik Hidayatullah</div>
              <div className="text-[10px] text-stone-500">Pemimpin Redaksi</div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 text-[10px] text-stone-500">
            Node.js v24.22 · Prisma ORM
          </div>
        </div>
      </aside>

      {/* Main CMS Content Area */}
      <main className="flex-grow p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

