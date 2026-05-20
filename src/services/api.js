const BASE_URL = 'http://localhost:8000/api'

export async function getPeople() {
  const res = await fetch(`${BASE_URL}/people/`)
  if (!res.ok) throw new Error('Failed to fetch people')
  return res.json()
}

export async function getPerson(id) {
  const res = await fetch(`${BASE_URL}/people/${id}/`)
  if (!res.ok) throw new Error('Failed to fetch person')
  return res.json()
}
