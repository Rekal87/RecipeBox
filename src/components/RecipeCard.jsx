import { useState } from 'react'

export default function RecipeCard({ recipe, isOwner, bannerBg, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--red)' : 'var(--border)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'border-color 0.15s, transform 0.1s',
      }}
    >
      <div style={{ height: 100, background: bannerBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, position: 'relative' }}>
        {recipe.emoji || '🍲'}
        {isOwner && !recipe.isPublic && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.35)', color: '#fff',
            borderRadius: 6, width: 24, height: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="ti ti-lock" style={{ fontSize: 11 }} aria-label="Private recipe" />
          </div>
        )}
      </div>

      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>{recipe.title}</div>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-muted)' }}>
          {recipe.time && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <i className="ti ti-clock" style={{ fontSize: 12 }} aria-hidden="true" /> {recipe.time}
            </span>
          )}
          {recipe.servings && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <i className="ti ti-users" style={{ fontSize: 12 }} aria-hidden="true" /> {recipe.servings}
            </span>
          )}
        </div>
        {recipe.category && (
          <span style={{
            display: 'inline-block', fontSize: 11, padding: '2px 9px',
            borderRadius: 10, background: 'var(--red-light)', color: 'var(--red-dark)', marginTop: 8,
          }}>
            {recipe.category}
          </span>
        )}
      </div>
    </div>
  )
}
