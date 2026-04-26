import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function DropdownMenu({ label, icon, items = [], activeItemId, onItemSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (itemId) => {
    setIsOpen(false);
    onItemSelect?.(itemId);
  };

  const hasActiveItem = items.some((item) => item.id === activeItemId);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-3 rounded-[18px] border px-4 py-3 text-left transition ${
          hasActiveItem
            ? 'border-brand-100 bg-brand-50 text-brand-500'
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="flex items-center gap-3">
          {icon ? <span className="inline-flex items-center justify-center text-brand-500">{icon}</span> : null}
          <span>{label}</span>
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 grid gap-1.5 rounded-[18px] border border-gray-200 bg-white p-2 shadow-theme-sm">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-xl px-3 py-2 text-left transition ${
                activeItemId === item.id
                  ? 'bg-brand-50 text-brand-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default DropdownMenu;
