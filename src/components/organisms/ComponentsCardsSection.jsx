import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';
import TailButton from '../atoms/TailButton';

const cardsCode = `import TailCard from '../components/atoms/TailCard';
import TailButton from '../components/atoms/TailButton';

function ExampleCard() {
  return (
    <TailCard title="Card with Image">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-5 h-36 rounded-lg bg-gray-100" />
        <h4 className="mb-1 text-xl font-medium text-gray-800">Card title</h4>
        <p className="text-sm text-gray-500">Card body content</p>
        <div className="mt-4">
          <TailButton variant="primary">Read more</TailButton>
        </div>
      </div>
    </TailCard>
  );
}`;

function CardContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-5 h-32 rounded-lg bg-gradient-to-r from-brand-100 to-brand-200" />
        <h4 className="mb-1 text-xl font-medium text-gray-800">Card title</h4>
        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <div className="mt-4">
          <TailButton variant="primary">Read more</TailButton>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-5 h-32 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300" />
        <h4 className="mb-1 text-xl font-medium text-gray-800">Card title</h4>
        <p className="text-sm text-gray-500">Pattern kartu horizontal/feature yang dipakai di TailAdmin.</p>
        <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600">
          Card link
        </a>
      </div>
    </div>
  );
}

function ComponentsCardsSection() {
  return (
    <ComponentShowcaseItem
      title="Card Components"
      summary="Struktur kartu mengikuti class kombinasi dari `cards.html`: wrapper rounded-2xl, card item rounded-xl, border gray, dan CTA `bg-brand-500`."
      preview={<CardContent />}
      code={cardsCode}
    />
  );
}

export default ComponentsCardsSection;
