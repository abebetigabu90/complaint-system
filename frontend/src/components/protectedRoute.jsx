// frontend/src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(()=> {
    (async ()=>{
      try {
        const res = await fetch('http://localhost:3000/auth/me', {
          credentials: 'include'
        });
        if (res.ok) setOk(true);
      } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Checking auth...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}
