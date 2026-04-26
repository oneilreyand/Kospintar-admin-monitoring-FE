function MenuItem({
  icon,
  label,
  badge,
  isActive = false,
  onClick,
  className = '',
  activeStyle = 'background',
}) {
  const getActiveClasses = () => {
    switch (activeStyle) {
      case 'border-left':
        return 'bg-primary/15 text-primary border-l-4 border-primary font-medium';
      case 'dot':
        return "bg-primary/10 text-primary font-medium relative before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-primary before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 pl-6";
      default:
        return 'bg-primary/12 text-primary font-medium';
    }
  };

  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left transition-colors duration-200 ${
        isActive ? getActiveClasses() : 'hover:bg-[#edf2ef] text-sidebar-text dark:text-dark-text'
      } ${className}`.trim()}
      onClick={onClick}
    >
      <span className="flex min-w-0 items-center space-x-3">
        <span className={isActive ? 'text-primary' : 'text-sidebar-text dark:text-dark-text'}>
          {icon}
        </span>
        <span className="block whitespace-nowrap text-base transition-opacity duration-300 ease-out md:opacity-0 md:group-hover:opacity-100">
          {label}
        </span>
      </span>
      {badge ? (
        <span
          className={`min-w-[20px] rounded-full bg-custom-blue-500 px-2 py-1 text-center text-xs text-white transition-opacity duration-300 ease-out ${
            isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
          }`}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export default MenuItem;
