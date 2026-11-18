import { MastheadNavbar } from "@/components/layout/MastheadNavbar";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { EditorialFooter } from "@/components/layout/EditorialFooter";
import { getHomepageData } from "@/lib/queries/articles";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, breakingTickers } = await getHomepageData();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <BreakingTicker articles={breakingTickers} />
      <MastheadNavbar categories={categories} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <EditorialFooter categories={categories} />
    </div>
  );
}
