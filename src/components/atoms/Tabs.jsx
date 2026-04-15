import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-100">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`relative px-6 py-3 text-sm font-bold transition-all ${
              activeTab === index 
                ? 'text-indigo-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600 animate-in fade-in slide-in-from-bottom-1 duration-200" />
            )}
          </button>
        ))}
      </div>
      
      <div className="animate-in fade-in duration-300">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
