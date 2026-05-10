const BASE_URL = "/api"

export async function fetchBoards(token) {
  const response = await fetch(`${BASE_URL}/boards`, {
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

export async function createBoard(token, title) {
  const response = await fetch(`${BASE_URL}/boards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({board: {title}}),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data.errors
  }

  return data.data
}

export async function deleteBoard(token, id) {
  const response = await fetch(`${BASE_URL}/boards/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete board")
  }

  return id
}