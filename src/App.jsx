import './App.css';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Router from './router';
import { initAuth } from './store/action/authActions';

function App() {
  const dispatch = useDispatch();
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;
    dispatch(initAuth());
  }, [dispatch]);

  return <Router />;
}

export default App;
