const BASE_URL = "/api"

export async function fetchCards(token, listId) {
  const response = await fetch(`${BASE_URL}/lists/${listId}/cards`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw data.errors
  }

  return data.data
}

export async function createCard(token, listId, title) {
  const response = await fetch(`${BASE_URL}/lists/${listId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({card: {title, position: 0}}),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data.errors
  }

  return data.data
}