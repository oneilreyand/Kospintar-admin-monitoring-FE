import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`relative px-6 py-3 text-sm font-bold transition-all ${
              activeTab === index 
                ? 'text-primary' 
                : 'text-text-secondary hover:text-navy'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-200" />
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
