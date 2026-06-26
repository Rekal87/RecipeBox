const CAT_BG = {
  Breakfast: '#fff8e1', Lunch: '#e8f5e9', Dinner: '#fce4ec',
  Snack: '#e3f2fd', Dessert: '#f3e5f5', Vegetarian: '#dcedc8',
  Quick: '#fff3e0', '': '#fdf6ec',
}

export default function ViewModal({ recipe, isOwner, onClose, onEdit, onDelete }) {
  const bg = CAT_BG[recipe.category] || CAT_BG['']

  const confirmDelete = () => {
    if (window.confirm('Delete this recipe?')) onDelete()
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={{ height: 130, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, borderRadius: '16px 16px 0 0' }}>
          {recipe.emoji || '🍲'}
        </div>

        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, fontWeight: 500, fontFamily: "'Lora', serif" }}>{recipe.title}</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              {recipe.category && <Badge icon="ti-tag">{recipe.category}</Badge>}
              {recipe.time && <Badge icon="ti-clock">{recipe.time}</Badge>}
              {recipe.servings && <Badge icon="ti-users">{recipe.servings}</Badge>}
              {isOwner && (
                <Badge icon={recipe.isPublic ? 'ti-world' : 'ti-lock'} color={recipe.isPublic ? 'public' : 'private'}>
                  {recipe.isPublic ? 'Public' : 'Private'}
                </Badge>
              )}
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            <i className="ti ti-x" />
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem' }}>
          {recipe.ingredients && (
            <>
              <div style={styles.sectionLabel}>Ingredients</div>
              <p style={styles.sectionText}>{recipe.ingredients}</p>
            </>
          )}
          {recipe.steps && (
            <>
              <div style={{ ...styles.sectionLabel, marginTop: '1.25rem' }}>How to make it</div>
              <p style={styles.sectionText}>{recipe.steps}</p>
            </>
          )}
        </div>

        <div style={styles.footer}>
          {isOwner && (
            <button onClick={confirmDelete} style={styles.btnDelete}>
              <i className="ti ti-trash" aria-hidden="true" /> Delete
            </button>
          )}
          <button onClick={onClose} style={styles.btnOutline}>Close</button>
          {isOwner && (
            <button onClick={onEdit} style={styles.btnPrimary}>
              <i className="ti ti-edit" aria-hidden="true" /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Badge({ icon, color, children }) {
  const colorStyles = {
    public: { background: '#e8f5e9', color: '#2e7d32', borderColor: '#c8e6c9' },
    private: { background: 'var(--red-light)', color: 'var(--red-dark)', borderColor: '#f5c6c3' },
  }
  return (
    <span style={{
      fontSize: 12, padding: '3px 10px', borderRadius: 10,
      background: 'var(--warm-gray)', border: '1px solid var(--border)',
      color: 'var(--text-mid)', display: 'inline-flex', alignItems: 'center', gap: 4,
      ...(colorStyles[color] || {}),
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: 12 }} aria-hidden="true" />
      {children}
    </span>
  )
}

const styles = {
  backdrop: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 300, padding: '1rem',
  },
  modal: {
    background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)',
    width: '100%', maxWidth: 540, maxHeight: '92vh', overflowY: 'auto',
  },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 20, padding: 2, lineHeight: 1, flexShrink: 0 },
  sectionLabel: { fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 },
  sectionText: { fontSize: 14, color: 'var(--text)', lineHeight: 1.75, whiteSpace: 'pre-wrap' },
  footer: { padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, justifyContent: 'flex-end' },
  btnDelete: { background: 'none', border: '1px solid var(--red)', borderRadius: 'var(--radius)', padding: '8px 14px', fontSize: 14, cursor: 'pointer', color: 'var(--red)', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 5, marginRight: 'auto' },
  btnOutline: { padding: '8px 16px', borderRadius: 'var(--radius)', background: 'transparent', border: '1px solid var(--border)', fontSize: 14, cursor: 'pointer', color: 'var(--text-mid)', fontFamily: 'inherit' },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '8px 16px', borderRadius: 'var(--radius)', background: 'var(--red)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' },
}
