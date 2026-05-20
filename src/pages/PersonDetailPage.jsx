import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPerson } from '../services/api'
import styles from './PersonDetailPage.module.css'

function avatarUrl(firstName, lastName) {
  const seed = encodeURIComponent(`${firstName} ${lastName}`)
  return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}`
}

function formatDate(iso) {
  if (!iso) return '—'
  const [year, month, day] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function PersonDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPerson(id)
      .then(setPerson)
      .catch(() => setError('Pessoa não encontrada.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className={styles.centered}>Loading...</div>
  if (error) return <div className={styles.centered}>{error}</div>

  const fullName = `${person.first_name} ${person.last_name}`

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>People Directory</span>
      </header>

      <main className={styles.main}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/people" className={styles.breadcrumbLink}>People</Link>
          <span className={styles.breadcrumbSep}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>{fullName}</span>
        </nav>

        {/* Back link */}
        <button className={styles.backBtn} onClick={() => navigate('/people')}>
          ← Back to list
        </button>

        {/* Edit button */}
        <div className={styles.editRow}>
          <button className={styles.editBtn}>
            ✏ Edit Profile
          </button>
        </div>

        {/* Profile card */}
        <div className={styles.profileCard}>
          <img
            className={styles.avatar}
            src={avatarUrl(person.first_name, person.last_name)}
            alt={fullName}
          />
          <div>
            <h1 className={styles.name}>{fullName}</h1>
            <span className={styles.activeBadge}>Active</span>
          </div>
        </div>

        {/* Info grid */}
        <div className={styles.infoGrid}>
          {/* Personal Information */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Personal Information</h2>
            <div className={styles.field}>
              <span className={styles.label}>First Name</span>
              <span className={styles.value}>{person.first_name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Last Name</span>
              <span className={styles.value}>{person.last_name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Date of Birth</span>
              <span className={styles.value}>{formatDate(person.date_of_birth)}</span>
            </div>
          </div>

          {/* Address */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Address</h2>
            <div className={styles.field}>
              <span className={styles.label}>Street</span>
              <span className={styles.value}>{person.street}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>City</span>
              <span className={styles.value}>{person.city}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>State</span>
              <span className={styles.value}>{person.state}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>ZIP Code</span>
              <span className={styles.value}>{person.zip_code}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Country</span>
              <span className={styles.value}>{person.country}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.contactCard}>
          <h2 className={styles.cardTitle}>Contact Information</h2>
          <table className={styles.contactTable}>
            <thead>
              <tr>
                <th className={styles.contactTh}>Type</th>
                <th className={styles.contactTh}>Value</th>
                <th className={styles.contactTh}>Label</th>
                <th className={styles.contactTh}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.contactRow}>
                <td className={styles.contactTd}>Email</td>
                <td className={styles.contactTdValue}>{person.email}</td>
                <td className={styles.contactTd}>
                  <span className={styles.labelTag}>Work</span>
                </td>
                <td className={styles.contactTd}>
                  <button className={styles.iconBtn} title="Edit">✏</button>
                </td>
              </tr>
              <tr className={styles.contactRow}>
                <td className={styles.contactTd}>Phone</td>
                <td className={styles.contactTdValue}>{person.phone}</td>
                <td className={styles.contactTd}>
                  <span className={styles.labelTag}>Work</span>
                </td>
                <td className={styles.contactTd}>
                  <button className={styles.iconBtn} title="Edit">✏</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
