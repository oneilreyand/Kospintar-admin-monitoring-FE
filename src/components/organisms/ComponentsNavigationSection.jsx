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
      <section className="rounded-2xl border border-border bg-white px-6 py-6 shadow-sm">
        <h2 className="text-xl font-bold text-navy">Navigation Components</h2>
        <p className="mt-2 text-sm text-text-secondary">Components for site navigation and page transitions.</p>
      </section>

      <ComponentShowcaseItem
        title="Breadcrumbs"
        summary="Breadcrumbs help users understand their current location within the application's hierarchy."
        code={breadcrumbCode}
        preview={(
          <div className="w-full rounded-lg border border-border bg-background p-4">
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
          <div className="w-full rounded-xl border border-border p-6">
            <Tabs 
              tabs={[
                { 
                  label: 'Account Info', 
                  content: <p className="text-sm italic text-navy">"Displaying Account content..."</p> 
                },
                { 
                  label: 'Security Settings', 
                  content: <p className="text-sm italic text-navy">"Displaying Security content..."</p> 
                },
                { 
                  label: 'Billing History', 
                  content: <p className="text-sm italic text-navy">"Displaying Billing content..."</p> 
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
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-background focus:ring-2 focus:ring-primary/20">
              <ChevronLeft size={20} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-white shadow-md">1</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border font-bold text-navy hover:bg-background">2</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border font-bold text-navy hover:bg-background">3</button>
            <span className="px-2 text-text-secondary">...</span>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border font-bold text-navy hover:bg-background">12</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-background focus:ring-2 focus:ring-primary/20">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default ComponentsNavigationSection;
