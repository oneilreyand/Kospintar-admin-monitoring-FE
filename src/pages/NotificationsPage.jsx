import { useSelector } from 'react-redux';

function NotificationsPage() {
  const notificationHealth = useSelector((state) => state.monitoring.notificationHealth);

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Notification Health</p>
          <h1 className="page-title">Pantau kegagalan kirim, retry, dan channel preferences.</h1>
          <p className="page-subtitle">
            Ini akan menjadi rumah untuk monitoring `NotificationLogs`, `ReminderLogs`, dan status
            gateway email/WhatsApp.
          </p>
        </div>
      </section>

      <section className="coverage-grid">
        {notificationHealth.map((item) => (
          <article className="page-card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="muted">{item.summary}</p>
            <ul className="plain-list">
              {item.items.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default NotificationsPage;
