import { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import Header from './components/Header.jsx'
import RecipeGrid from './components/RecipeGrid.jsx'
import LoginBanner from './components/LoginBanner.jsx'
import RecipeModal from './components/RecipeModal.jsx'
import ViewModal from './components/ViewModal.jsx'
import Notification from './components/Notification.jsx'

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Vegetarian', 'Quick']

function uid() { return Math.random().toString(36).slice(2, 10) }

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('rb_user') || 'null'))
  const [recipes, setRecipes] = useState(() => JSON.parse(localStorage.getItem('rb_recipes') || '[]'))
  const [activeTag, setActiveTag] = useState('All')
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editRecipe, setEditRecipe] = useState(null)
  const [viewRecipe, setViewRecipe] = useState(null)
  const [notif, setNotif] = useState('')

  useEffect(() => {
    localStorage.setItem('rb_recipes', JSON.stringify(recipes))
  }, [recipes])

  useEffect(() => {
    localStorage.setItem('rb_user', JSON.stringify(user))
  }, [user])

  const notify = (msg) => {
    setNotif(msg)
    setTimeout(() => setNotif(''), 2500)
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
      const profile = await res.json()
      const u = { id: profile.sub, name: profile.name, email: profile.email, picture: profile.picture }
      setUser(u)
      notify(`Welcome, ${profile.name.split(' ')[0]}!`)
    },
  })

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('rb_user')
    notify('Signed out.')
  }

  const visibleRecipes = recipes
    .filter(r => user ? (r.ownerId === user.id || r.isPublic) : r.isPublic)
    .filter(r => activeTag === 'All' || r.category === activeTag)
    .filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || (r.ingredients || '').toLowerCase().includes(search.toLowerCase()))

  const saveRecipe = (data) => {
    const isEdit = recipes.some(r => r.id === data.id)
    if (isEdit) {
      setRecipes(prev => prev.map(r => r.id === data.id ? data : r))
      notify('Recipe updated.')
    } else {
      setRecipes(prev => [...prev, { ...data, id: uid(), ownerId: user.id, createdAt: Date.now() }])
      notify('Recipe saved!')
    }
    setAddOpen(false)
    setEditRecipe(null)
  }

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id))
    setViewRecipe(null)
    notify('Recipe deleted.')
  }

  const openEdit = (recipe) => {
    setViewRecipe(null)
    setEditRecipe(recipe)
    setAddOpen(true)
  }

  const myCount = user ? recipes.filter(r => r.ownerId === user.id && !r.isPublic).length : 0
  const myPublicCount = user ? recipes.filter(r => r.ownerId === user.id && r.isPublic).length : 0

  return (
    <>
      <Header user={user} onLogin={login} onSignOut={signOut} onAddRecipe={() => { setEditRecipe(null); setAddOpen(true) }} />

      <main style={{ maxWidth: 920, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {!user && <LoginBanner onLogin={login} />}

        <div style={{ marginBottom: '1.25rem' }}>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 500 }}>
            {user ? 'Your recipes' : 'Community recipes'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 3 }}>
            {user
              ? `${myCount} private · ${myPublicCount} public`
              : `${visibleRecipes.length} shared recipes`}
          </p>
        </div>

        <RecipeGrid
          recipes={visibleRecipes}
          user={user}
          categories={CATEGORIES}
          activeTag={activeTag}
          search={search}
          totalCount={recipes.length}
          onTagChange={setActiveTag}
          onSearchChange={setSearch}
          onCardClick={setViewRecipe}
          onAddRecipe={() => { setEditRecipe(null); setAddOpen(true) }}
          onLogin={login}
        />
      </main>

      {addOpen && (
        <RecipeModal
          recipe={editRecipe}
          onSave={saveRecipe}
          onClose={() => { setAddOpen(false); setEditRecipe(null) }}
        />
      )}

      {viewRecipe && (
        <ViewModal
          recipe={viewRecipe}
          isOwner={user && viewRecipe.ownerId === user.id}
          onClose={() => setViewRecipe(null)}
          onEdit={() => openEdit(viewRecipe)}
          onDelete={() => deleteRecipe(viewRecipe.id)}
        />
      )}

      <Notification message={notif} />
    </>
  )
}
