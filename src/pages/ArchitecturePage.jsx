import { useSelector } from 'react-redux';

function ArchitecturePage() {
  const architecture = useSelector((state) => state.monitoring.architecture);

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Architecture</p>
          <h1 className="page-title">Kenapa struktur repo ini meniru KospintarFE.</h1>
          <p className="page-subtitle">
            Supaya tim bisa reuse kebiasaan kerja yang sama: `router`, `pages`, `components`,
            `services`, dan `store`.
          </p>
        </div>
      </section>

      <section className="coverage-grid">
        {architecture.map((card) => (
          <article className="page-card" key={card.title}>
            <h2>{card.title}</h2>
            <p className="muted">{card.summary}</p>
            <ul className="plain-list">
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default ArchitecturePage;
