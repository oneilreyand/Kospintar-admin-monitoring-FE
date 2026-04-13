function Spinner({ fullscreen = false, label = 'Loading...' }) {
  return (
    <div className={fullscreen ? 'spinner-screen' : 'spinner-inline'}>
      <div className="spinner-dot" />
      <p>{label}</p>
    </div>
  );
}

export default Spinner;
