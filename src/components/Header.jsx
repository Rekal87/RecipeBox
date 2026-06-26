import { useState, useEffect, useRef } from 'react'
import GoogleLogo from './GoogleLogo.jsx'

export default function Header({ user, onLogin, onSignOut, onAddRecipe }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 1.5rem',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, background: 'var(--red)', borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>🍲</div>
        <span style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 500 }}>Recipe Box</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {user ? (
          <>
            <button onClick={onAddRecipe} style={styles.btnPrimary}>
              <i className="ti ti-plus" aria-hidden="true" /> Add recipe
            </button>
            <div ref={menuRef} style={{ position: 'relative' }}>
              <img
                src={user.picture}
                alt={user.name}
                onClick={() => setMenuOpen(o => !o)}
                style={{ width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', border: '2px solid var(--red-light)', objectFit: 'cover' }}
              />
              {menuOpen && (
                <div style={styles.menu}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{user.email}</div>
                  </div>
                  <button onClick={() => { setMenuOpen(false); onSignOut() }} style={styles.menuItem}>
                    <i className="ti ti-logout" aria-hidden="true" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button onClick={onLogin} style={styles.btnGoogle}>
            <GoogleLogo /> Sign in with Google
          </button>
        )}
      </div>
    </header>
  )
}

const styles = {
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 'var(--radius)',
    background: 'var(--red)', color: '#fff', border: 'none',
    fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
  },
  btnGoogle: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '8px 14px', borderRadius: 'var(--radius)',
    background: 'var(--surface)', border: '1px solid var(--border)',
    fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text)',
  },
  menu: {
    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', minWidth: 200,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 200,
  },
  menuItem: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 14px', fontSize: 14, color: 'var(--red)',
    background: 'none', border: 'none', width: '100%',
    textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
  },
}
