export default function Notification({ message }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
      background: 'var(--text)', color: 'var(--cream)',
      padding: '10px 20px', borderRadius: 30, fontSize: 14,
      zIndex: 9999, pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  )
}
