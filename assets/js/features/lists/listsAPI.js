const BASE_URL = "/api"

export async function fetchLists(token, boardId) {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
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

export async function createList(token, boardId, title) {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({list: {title, position: 0}}),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data.errors
  }

  return data.data
}