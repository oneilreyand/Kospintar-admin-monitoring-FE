import TailCard from '../atoms/TailCard';
import PaletteSwatch from '../molecules/PaletteSwatch';

const paletteItems = [
  { name: 'Brand 500', token: 'bg-brand-500', value: '#465fff' },
  { name: 'Brand 600', token: 'bg-brand-600', value: '#3641f5' },
  { name: 'Gray 50', token: 'bg-gray-50', value: '#f9fafb' },
  { name: 'Gray 700', token: 'text-gray-700', value: '#344054' },
  { name: 'Success 500', token: 'bg-success-500', value: '#12b76a' },
  { name: 'Error 500', token: 'bg-error-500', value: '#f04438' },
  { name: 'Warning 500', token: 'bg-warning-500', value: '#f79009' },
  { name: 'Blue Light 500', token: 'text-blue-light-500', value: '#0ba5ec' },
];

function ComponentsPaletteSection() {
  return (
    <TailCard title="TailAdmin Palette (Scraped)">
      <p className="mb-5 text-sm text-gray-500">
        Token ini diambil dari `style.css` TailAdmin (marketing demo) dan dipakai ulang di Tailwind config project ini.
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
