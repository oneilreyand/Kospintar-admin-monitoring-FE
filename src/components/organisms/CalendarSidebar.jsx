function formatDateInput(date) {
  if (!date) return '';

  const parsedDate = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  return parsedDate.toISOString().slice(0, 10);
}

function CalendarSidebar({
  currentDate,
  onDateChange,
  eventFilters = {},
  onEventFiltersChange,
  onAddEventClick,
}) {
  const formattedDate = formatDateInput(currentDate);

  const handleDateChange = (event) => {
    onDateChange?.(new Date(event.target.value));
  };

  const handleFilterChange = (key, checked) => {
    onEventFiltersChange?.({
      ...eventFilters,
      [key]: checked,
    });
  };

  return (
    <aside className="grid w-full max-w-[320px] gap-[18px]">
      <button
        type="button"
        className="button button-primary w-full"
        onClick={onAddEventClick}
      >
        Add Event
      </button>

      <section className="grid gap-3.5 rounded-[20px] border border-line bg-white/80 p-[18px] shadow-shell">
        <span className="eyebrow">Mini Calendar</span>
        <label className="field">
          <span>Tanggal aktif</span>
          <input type="date" value={formattedDate} onChange={handleDateChange} />
        </label>
      </section>

      <section className="grid gap-3.5 rounded-[20px] border border-line bg-white/80 p-[18px] shadow-shell">
        <span className="eyebrow">Event Filters</span>
        <div className="grid gap-3">
          {Object.entries(eventFilters).map(([key, value]) => (
            <label className="flex items-center gap-2.5" key={key}>
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(event) => handleFilterChange(key, event.target.checked)}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default CalendarSidebar;
