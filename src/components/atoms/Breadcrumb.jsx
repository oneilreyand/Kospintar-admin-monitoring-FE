import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm font-medium text-text-secondary">
      <Link to="/" className="hover:text-primary">
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <ChevronRight size={14} className="text-border" />
          {index === items.length - 1 ? (
            <span className="text-primary">{item.label}</span>
          ) : (
            <Link to={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
