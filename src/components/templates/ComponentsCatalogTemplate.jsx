import ComponentsPaletteSection from '../organisms/ComponentsPaletteSection';
import ComponentsButtonsSection from '../organisms/ComponentsButtonsSection';
import ComponentsCardsSection from '../organisms/ComponentsCardsSection';
import ComponentsFeedbackSection from '../organisms/ComponentsFeedbackSection';
import ComponentsNavigationSection from '../organisms/ComponentsNavigationSection';
import ComponentsMediaSection from '../organisms/ComponentsMediaSection';
import ComponentsSnackbarSection from '../organisms/ComponentsSnackbarSection';

function ComponentsCatalogTemplate() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6 ring-1 ring-slate-100 shadow-sm">
        <p className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Components Catalog
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900 leading-none">TailAdmin UI Library Replication</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-500 leading-relaxed">
          The following components have been meticulously replicated from the TailAdmin UI library. 
          They are built using Tailwind CSS and Lucide React, following the atomic design principles 
          integrated into the Kospintar monitoring ecosystem.
        </p>
      </section>

      <ComponentsPaletteSection />
      <ComponentsButtonsSection />
      <ComponentsCardsSection />
      <ComponentsFeedbackSection />
      <ComponentsNavigationSection />
      <ComponentsMediaSection />
      <ComponentsSnackbarSection />
    </div>
  );
}


export default ComponentsCatalogTemplate;
