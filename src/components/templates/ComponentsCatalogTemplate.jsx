import ComponentsPaletteSection from '../organisms/ComponentsPaletteSection';
import ComponentsButtonsSection from '../organisms/ComponentsButtonsSection';
import ComponentsCardsSection from '../organisms/ComponentsCardsSection';
import ComponentsDashboardSection from '../organisms/ComponentsDashboardSection';
import ComponentsFeedbackSection from '../organisms/ComponentsFeedbackSection';
import ComponentsNavigationSection from '../organisms/ComponentsNavigationSection';
import ComponentsMediaSection from '../organisms/ComponentsMediaSection';
import ComponentsSnackbarSection from '../organisms/ComponentsSnackbarSection';

function ComponentsCatalogTemplate() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border bg-white px-6 py-6 shadow-[0_10px_28px_rgba(44,62,80,0.06)]">
        <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Components Catalog
        </p>
        <h1 className="mt-4 text-2xl font-semibold leading-none text-navy">Kospintar UI System Components</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
          Contoh komponen di halaman ini mengikuti detail di `UI_SYSTEM_DOCUMENTATION.md` dan panduan praktis dari `UI_GUIDE.md`, menggunakan pola atomic design yang sama dengan aplikasi monitoring.
        </p>
      </section>

      <ComponentsPaletteSection />
      <ComponentsButtonsSection />
      <ComponentsCardsSection />
      <ComponentsDashboardSection />
      <ComponentsFeedbackSection />
      <ComponentsNavigationSection />
      <ComponentsMediaSection />
      <ComponentsSnackbarSection />
    </div>
  );
}

export default ComponentsCatalogTemplate;
