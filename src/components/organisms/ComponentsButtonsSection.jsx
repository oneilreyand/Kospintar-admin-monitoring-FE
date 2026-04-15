import TailButton from '../atoms/TailButton';
import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';

function BoxIcon() {
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.78 3.24a.5.5 0 0 1 .44 0l5.15 2.58-5.03 2.51a.74.74 0 0 1-.67 0L4.63 5.82zM3.7 7.03v6.38a.31.31 0 0 0 .17.28l5.38 2.7V9.78a2.6 2.6 0 0 1-.26-.11zm7.05 9.46v-6.7c.09-.03.18-.07.26-.11l5.29-2.65v6.38a.31.31 0 0 1-.17.28z" />
    </svg>
  );
}

const buttonsCode = `import TailButton from '../components/atoms/TailButton';

function Example() {
  return (
    <div className="flex gap-3">
      <TailButton variant="primary">Primary</TailButton>
      <TailButton variant="secondary" size="lg">Secondary</TailButton>
      <TailButton variant="primary" leftIcon={<BoxIcon />}>
        With Icon
      </TailButton>
    </div>
  );
}`;

function ComponentsButtonsSection() {
  return (
    <div className="space-y-8">
      <ComponentShowcaseItem
        title="Button Components"
        summary="Class utama ini disalin dari pola `buttons.html`: rounded-lg, `bg-brand-500`, `shadow-theme-xs`, dan variant secondary pakai ring gray."
        preview={(
          <div className="flex flex-wrap items-center gap-3">
            <TailButton variant="primary">Button Text</TailButton>
            <TailButton variant="primary" size="lg">Button Text</TailButton>
            <TailButton variant="primary" leftIcon={<BoxIcon />}>Button Text</TailButton>
            <TailButton variant="secondary">Button Text</TailButton>
            <TailButton variant="secondary" rightIcon={<BoxIcon />}>Button Text</TailButton>
          </div>
        )}
        code={buttonsCode}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Button Groups</h3>
        <div className="mt-6 flex flex-wrap gap-8">
           <div className="flex">
             <button className="rounded-l-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Left</button>
             <button className="border-y border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Center</button>
             <button className="rounded-r-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Right</button>
           </div>
           
           <div className="flex">
             <button className="rounded-l-lg bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-500">Left</button>
             <button className="border-x border-indigo-500/30 bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-500">Center</button>
             <button className="rounded-r-lg bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-500">Right</button>
           </div>
        </div>
      </div>
    </div>
  );
}


export default ComponentsButtonsSection;
