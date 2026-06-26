import RecipeCard from './RecipeCard.jsx'

const CAT_BG = {
  Breakfast: '#fff8e1', Lunch: '#e8f5e9', Dinner: '#fce4ec',
  Snack: '#e3f2fd', Dessert: '#f3e5f5', Vegetarian: '#dcedc8',
  Quick: '#fff3e0', '': '#fdf6ec',
}

export default function RecipeGrid({ recipes, user, categories, activeTag, search, totalCount, onTagChange, onSearchChange, onCardClick, onAddRecipe, onLogin }) {
  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <i className="ti ti-search" aria-hidden="true" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16, pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search recipes…"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            style={{
              width: '100%', padding: '9px 12px 9px 34px',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              fontSize: 14, background: 'var(--surface)', color: 'var(--text)',
              fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>
        {user && (
          <button onClick={onAddRecipe} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 'var(--radius)',
            background: 'var(--red)', color: '#fff', border: 'none',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <i className="ti ti-plus" aria-hidden="true" /> Add recipe
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onTagChange(cat)}
            style={{
              padding: '5px 13px', borderRadius: 20, fontSize: 12,
              border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit',
              background: activeTag === cat ? 'var(--red)' : 'var(--surface)',
              color: activeTag === cat ? '#fff' : 'var(--text-mid)',
              borderColor: activeTag === cat ? 'var(--red)' : 'var(--border)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {recipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div style={{ fontSize: 52, marginBottom: '1rem' }}>🍽️</div>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 500, marginBottom: 8 }}>
            {totalCount ? 'No matching recipes' : 'No public recipes yet'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: '1.25rem' }}>
            {user ? 'Add your first recipe above.' : 'Sign in to add your own recipes.'}
          </p>
          {user ? (
            <button onClick={onAddRecipe} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 'var(--radius)',
              background: 'var(--red)', color: '#fff', border: 'none',
              fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="ti ti-plus" aria-hidden="true" /> Add recipe
            </button>
          ) : (
            <button onClick={onLogin} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 'var(--radius)',
              background: 'var(--surface)', border: '1px solid var(--border)',
              fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text)',
            }}>
              Sign in to add recipes
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 16 }}>
          {recipes.map(r => (
            <RecipeCard
              key={r.id}
              recipe={r}
              isOwner={user && r.ownerId === user.id}
              bannerBg={CAT_BG[r.category] || CAT_BG['']}
              onClick={() => onCardClick(r)}
            />
          ))}
        </div>
      )}
    </>
  )
}
