import MenuItem from '../molecules/MenuItem';

function MenuSection({ title, items, location, onItemClick, activeStyle = 'background' }) {
  return (
    <section className="space-y-2">
      <p className="mt-4 mb-2 block px-2 text-xs uppercase text-sidebar-text transition-opacity duration-300 ease-out dark:text-dark-text md:opacity-0 md:group-hover:opacity-100">
        {title}
      </p>
      {items.map((item) => (
        <MenuItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          isActive={location.pathname === item.path}
          onClick={() => onItemClick(item.path)}
          activeStyle={activeStyle}
        />
      ))}
    </section>
  );
}

export default MenuSection;
