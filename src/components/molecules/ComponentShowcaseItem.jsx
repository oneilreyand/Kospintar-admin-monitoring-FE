import CodeSnippet from '../atoms/CodeSnippet';
import TailCard from '../atoms/TailCard';

function ComponentShowcaseItem({ title, summary, preview, code }) {
  return (
    <TailCard title={title}>
      <p className="mb-5 text-sm text-gray-500">{summary}</p>
      <div className="grid gap-5 xl:grid-cols-[1fr_1.15fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          {preview}
        </div>
        <CodeSnippet code={code} />
      </div>
    </TailCard>
  );
}

export default ComponentShowcaseItem;
