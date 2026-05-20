import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPeople } from '../services/api'
import styles from './PeoplePage.module.css'

function avatarUrl(firstName, lastName) {
  const seed = encodeURIComponent(`${firstName} ${lastName}`)
  return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}`
}

export default function PeoplePage() {
  const [people, setPeople] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Erro ao carregar contatos.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = people.filter(p => {
    const q = search.toLowerCase()
    return (
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q)
    )
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>People Directory</span>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="#9ca3af" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>People</h1>
          <p className={styles.subtitle}>
            {loading ? '...' : `${filtered.length} contact${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {!error && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Avatar</th>
                  <th className={styles.th}>Full Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>City</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className={styles.loadingCell}>Loading...</td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.loadingCell}>No contacts found.</td>
                  </tr>
                )}
                {!loading && filtered.map(person => (
                  <tr key={person.id} className={styles.row}>
                    <td className={styles.td}>
                      <img
                        className={styles.avatar}
                        src={avatarUrl(person.first_name, person.last_name)}
                        alt={`${person.first_name} ${person.last_name}`}
                      />
                    </td>
                    <td className={styles.td}>
                      <span className={styles.name}>
                        {person.first_name} {person.last_name}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.email}>{person.email}</span>
                    </td>
                    <td className={styles.td}>{person.phone}</td>
                    <td className={styles.td}>{person.city}</td>
                    <td className={styles.td}>
                      <button
                        className={styles.viewBtn}
                        onClick={() => navigate(`/people/${person.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
