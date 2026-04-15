import React from 'react';
import Breadcrumb from '../atoms/Breadcrumb';
import Tabs from '../atoms/Tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';

const ComponentsNavigationSection = () => {
  const breadcrumbCode = `<Breadcrumb 
  items={[
    { label: 'Admin', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Navigation' }
  ]} 
/>`;

  const tabsCode = `<Tabs 
  tabs={[
    { label: 'Account', content: <AccountInfo /> },
    { label: 'Security', content: <SecuritySettings /> },
  ]} 
/>`;

  const paginationCode = `<div className="flex items-center space-x-2">
  <button className="...">1</button>
  <button className="...">2</button>
  <button className="...">3</button>
</div>`;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Navigation Components</h2>
        <p className="mt-2 text-sm text-slate-500">Components for site navigation and page transitions.</p>
      </section>

      <ComponentShowcaseItem
        title="Breadcrumbs"
        summary="Breadcrumbs help users understand their current location within the application's hierarchy."
        code={breadcrumbCode}
        preview={(
          <div className="w-full rounded-lg border border-slate-100 bg-slate-50/50 p-4">
            <Breadcrumb 
              items={[
                { label: 'Admin', href: '#' },
                { label: 'Components', href: '#' },
                { label: 'Navigation' }
              ]} 
            />
          </div>
        )}
      />

      <ComponentShowcaseItem
        title="Tabs"
        summary="Tabs organize content into separate views that are accessible via a simplified navigation."
        code={tabsCode}
        preview={(
          <div className="w-full rounded-xl border border-slate-100 p-6">
            <Tabs 
              tabs={[
                { 
                  label: 'Account Info', 
                  content: <p className="text-sm text-slate-600 italic">"Displaying Account content..."</p> 
                },
                { 
                  label: 'Security Settings', 
                  content: <p className="text-sm text-slate-600 italic">"Displaying Security content..."</p> 
                },
                { 
                  label: 'Billing History', 
                  content: <p className="text-sm text-slate-600 italic">"Displaying Billing content..."</p> 
                },
              ]} 
            />
          </div>
        )}
      />

      <ComponentShowcaseItem
        title="Pagination"
        summary="Pagination divides a large set of data into multiple pages."
        code={paginationCode}
        preview={(
          <div className="flex items-center space-x-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-100">
              <ChevronLeft size={20} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-md">1</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">2</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">12</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-100">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default ComponentsNavigationSection;

