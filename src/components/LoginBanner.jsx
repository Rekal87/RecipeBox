import GoogleLogo from './GoogleLogo.jsx'

export default function LoginBanner({ onLogin }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      padding: '2.5rem',
      textAlign: 'center',
      marginBottom: '2rem',
    }}>
      <div style={{ fontSize: 40, marginBottom: '1rem' }}>🔐</div>
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
        Save your personal recipes
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Sign in with Google to create your private recipe collection.<br />
        Your recipes are private by default — share only what you want.
      </p>
      <button onClick={onLogin} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 20px', borderRadius: 'var(--radius)',
        background: 'var(--surface)', border: '1px solid var(--border)',
        fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text)',
      }}>
        <GoogleLogo /> Sign in with Google
      </button>
    </div>
  )
}
