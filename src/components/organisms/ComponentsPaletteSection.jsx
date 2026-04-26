import TailCard from '../atoms/TailCard';
import PaletteSwatch from '../molecules/PaletteSwatch';

const paletteItems = [
  { name: 'Primary', token: 'bg-primary', value: '#2DCC70' },
  { name: 'Navy', token: 'bg-navy', value: '#2C3E50' },
  { name: 'Danger', token: 'bg-danger', value: '#E74C3C' },
  { name: 'Warning', token: 'bg-warning', value: '#F39C12' },
  { name: 'Promo', token: 'bg-promo', value: '#E91E63' },
  { name: 'Background', token: 'bg-background', value: '#F8F9FA' },
  { name: 'Border', token: 'border-border', value: '#E0E0E0' },
  { name: 'Text Secondary', token: 'text-text-secondary', value: '#7F8C8D' },
];

function ComponentsPaletteSection() {
  return (
    <TailCard title="Kospintar Palette (UI System)">
      <p className="mb-5 text-sm text-gray-500">
        Token ini mengikuti dokumentasi UI Kospintar (`UI_SYSTEM_DOCUMENTATION.md`) agar semua halaman konsisten.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {paletteItems.map((item) => (
          <PaletteSwatch key={item.token} name={item.name} token={item.token} value={item.value} />
        ))}
      </div>
    </TailCard>
  );
}

export default ComponentsPaletteSection;
