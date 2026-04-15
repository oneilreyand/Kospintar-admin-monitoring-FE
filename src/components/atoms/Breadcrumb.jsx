import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm font-medium text-slate-500">
      <Link to="/" className="hover:text-indigo-600">
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <ChevronRight size={14} className="text-slate-400" />
          {index === items.length - 1 ? (
            <span className="text-indigo-600">{item.label}</span>
          ) : (
            <Link to={item.href} className="hover:text-indigo-600">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
