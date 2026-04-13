import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissSnackbar } from '../../store/action/snackbar';

const EXIT_ANIMATION_MS = 260;
const DEFAULT_DURATION_MS = 4200;

function Snackbar() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.snackbar.items);
  const [exitingIds, setExitingIds] = useState({});
  const autoDismissTimers = useRef(new Map());
  const exitTimers = useRef(new Map());

  const removeNow = useCallback((id) => {
    dispatch(dismissSnackbar(id));
    setExitingIds((previous) => {
      if (!previous[id]) return previous;
      const next = { ...previous };
      delete next[id];
      return next;
    });
  }, [dispatch]);

  const scheduleExit = useCallback((id) => {
    if (exitTimers.current.has(id)) return;

    const autoTimer = autoDismissTimers.current.get(id);
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoDismissTimers.current.delete(id);
    }

    setExitingIds((previous) => ({ ...previous, [id]: true }));

    const exitTimer = setTimeout(() => {
      exitTimers.current.delete(id);
      removeNow(id);
    }, EXIT_ANIMATION_MS);

    exitTimers.current.set(id, exitTimer);
  }, [removeNow]);

  useEffect(() => {
    items.forEach((item) => {
      if (autoDismissTimers.current.has(item.id) || exitTimers.current.has(item.id)) {
        return;
      }
      const durationMs = Number(item.durationMs) > 0 ? Number(item.durationMs) : DEFAULT_DURATION_MS;
      const timer = setTimeout(() => scheduleExit(item.id), durationMs);
      autoDismissTimers.current.set(item.id, timer);
    });

    autoDismissTimers.current.forEach((timer, id) => {
      if (!items.some((item) => item.id === id)) {
        clearTimeout(timer);
        autoDismissTimers.current.delete(id);
      }
    });

    exitTimers.current.forEach((timer, id) => {
      if (!items.some((item) => item.id === id)) {
        clearTimeout(timer);
        exitTimers.current.delete(id);
      }
    });
  }, [items, scheduleExit]);

  useEffect(() => () => {
    autoDismissTimers.current.forEach((timer) => clearTimeout(timer));
    exitTimers.current.forEach((timer) => clearTimeout(timer));
  }, []);

  if (!items.length) return null;

  return (
    <div className="snackbar-stack">
      {items.map((item) => (
        <div
          className={`snackbar-card ${item.type || 'info'} ${exitingIds[item.id] ? 'is-exiting' : ''}`.trim()}
          key={item.id}
        >
          <div>
            <strong>{item.title}</strong>
            <p>{item.message}</p>
          </div>
          <button type="button" onClick={() => scheduleExit(item.id)}>
            Tutup
          </button>
        </div>
      ))}
    </div>
  );
}

export default Snackbar;
