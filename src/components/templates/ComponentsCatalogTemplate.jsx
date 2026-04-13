import ComponentsPaletteSection from '../organisms/ComponentsPaletteSection';
import ComponentsButtonsSection from '../organisms/ComponentsButtonsSection';
import ComponentsCardsSection from '../organisms/ComponentsCardsSection';
import ComponentsSnackbarSection from '../organisms/ComponentsSnackbarSection';

function ComponentsCatalogTemplate() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6">
        <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
          Components Catalog
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Scraped TailAdmin Components</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-500">
          Halaman ini berisi contoh komponen dan cara pakai yang disesuaikan dari hasil scrape URL TailAdmin marketing (`buttons.html`, `cards.html`, dan `style.css`).
        </p>
      </section>

      <ComponentsPaletteSection />
      <ComponentsButtonsSection />
      <ComponentsCardsSection />
      <ComponentsSnackbarSection />
    </div>
  );
}

export default ComponentsCatalogTemplate;
