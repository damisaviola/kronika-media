import Link from "next/link";
import { LayoutDashboard, PenLine, ExternalLink, Sparkles } from "lucide-react";

export default function RedaksiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row font-sans">
      {/* Editorial CMS Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 text-zinc-100 flex flex-col flex-shrink-0 border-r border-zinc-800">
        {/* Masthead Header */}
        <div className="p-5 border-b border-zinc-800/80">
          <Link href="/dashboard" className="block">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black tracking-tight text-white uppercase">
                KRONIKA
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mt-1 font-mono">
              Editorial Studio · Timika
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-grow text-xs font-semibold">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-zinc-400" />
            <span>Semua Artikel</span>
          </Link>

          <Link
            href="/dashboard/tulis"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-xs"
          >
            <PenLine className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </Link>

          <div className="pt-6 pb-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-3.5">
            Pratinjau
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Website →</span>
          </Link>
        </nav>

        {/* User Identity */}
        <div className="p-4 border-t border-zinc-800/80 text-xs text-zinc-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Editor Aktif: <strong>Yulius Kogoya (Timika)</strong></span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
