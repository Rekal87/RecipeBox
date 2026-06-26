import { useState } from 'react'

const EMOJIS = ['🍲','🥗','🍳','🥘','🍜','🍝','🥞','🥙','🌮','🍱','🥣','🍛','🍤','🫕','🥧','🎂','🍰','🍪','🍕','🥩']
const CATS = ['Breakfast','Lunch','Dinner','Snack','Dessert','Vegetarian','Quick']

export default function RecipeModal({ recipe, onSave, onClose }) {
  const isEdit = !!recipe
  const [form, setForm] = useState({
    id: recipe?.id || '',
    emoji: recipe?.emoji || '🍲',
    title: recipe?.title || '',
    category: recipe?.category || 'Dinner',
    time: recipe?.time || '',
    servings: recipe?.servings || '',
    ingredients: recipe?.ingredients || '',
    steps: recipe?.steps || '',
    isPublic: recipe?.isPublic ?? false,
    ownerId: recipe?.ownerId || '',
    createdAt: recipe?.createdAt || null,
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    if (!form.title.trim()) return
    onSave(form)
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={{ fontSize: 18, fontWeight: 500 }}>{isEdit ? 'Edit recipe' : 'New recipe'}</h2>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            <i className="ti ti-x" />
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={styles.label}>Icon</label>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 7 }}>
              {EMOJIS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => set('emoji', e)}
                  style={{
                    ...styles.emojiBtn,
                    borderColor: form.emoji === e ? 'var(--red)' : 'var(--border)',
                    background: form.emoji === e ? 'var(--red-light)' : 'var(--surface-off)',
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={styles.label}>Recipe name *</label>
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. Creamy tomato pasta"
              value={form.title}
              onChange={e => set('title', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={styles.label}>Category</label>
              <select style={styles.input} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Cook time</label>
              <input style={styles.input} type="text" placeholder="e.g. 20 min" value={form.time} onChange={e => set('time', e.target.value)} />
            </div>
          </div>

          <div>
            <label style={styles.label}>Servings</label>
            <input style={styles.input} type="text" placeholder="e.g. 4 people" value={form.servings} onChange={e => set('servings', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Ingredients</label>
            <textarea style={{ ...styles.input, resize: 'vertical', minHeight: 80, lineHeight: 1.6 }} placeholder={"One ingredient per line\ne.g. 2 cups flour"} value={form.ingredients} onChange={e => set('ingredients', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Steps</label>
            <textarea style={{ ...styles.input, resize: 'vertical', minHeight: 100, lineHeight: 1.6 }} placeholder="How to make it…" value={form.steps} onChange={e => set('steps', e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Visibility</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface-off)' }}>
              <span style={{ fontSize: 14, color: 'var(--text-mid)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className={`ti ti-${form.isPublic ? 'world' : 'lock'}`} aria-hidden="true" />
                {form.isPublic ? 'Public — anyone can see this' : 'Private — only visible to you'}
              </span>
              <label style={{ position: 'relative', width: 40, height: 22, flexShrink: 0 }}>
                <input type="checkbox" checked={form.isPublic} onChange={e => set('isPublic', e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{
                  position: 'absolute', inset: 0,
                  background: form.isPublic ? 'var(--red)' : 'var(--border)',
                  borderRadius: 11, cursor: 'pointer', transition: 'background 0.2s',
                }}>
                  <span style={{
                    position: 'absolute', width: 16, height: 16,
                    left: form.isPublic ? 21 : 3, top: 3,
                    background: 'white', borderRadius: '50%', transition: 'left 0.2s',
                  }} />
                </span>
              </label>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button onClick={onClose} style={styles.btnOutline}>Cancel</button>
          <button onClick={handleSave} style={styles.btnPrimary}>Save recipe</button>
        </div>
      </div>
    </div>
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
  header: {
    padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  footer: {
    padding: '1rem 1.5rem', borderTop: '1px solid var(--border)',
    display: 'flex', gap: 8, justifyContent: 'flex-end',
  },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 20, padding: 2, lineHeight: 1 },
  label: { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-mid)', marginBottom: 5 },
  input: {
    width: '100%', padding: '9px 12px', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', fontSize: 14, background: 'var(--surface)',
    color: 'var(--text)', fontFamily: 'inherit', outline: 'none',
  },
  emojiBtn: { width: 40, height: 40, border: '1px solid', borderRadius: 9, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  btnOutline: {
    padding: '8px 16px', borderRadius: 'var(--radius)',
    background: 'transparent', border: '1px solid var(--border)',
    fontSize: 14, cursor: 'pointer', color: 'var(--text-mid)', fontFamily: 'inherit',
  },
  btnPrimary: {
    padding: '8px 20px', borderRadius: 'var(--radius)',
    background: 'var(--red)', color: '#fff', border: 'none',
    fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
  },
}
