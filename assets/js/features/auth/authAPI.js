const BASE_URL = "/api"

export async function registerUser({email, password}) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({user: {email, password}}),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data.errors
  }

  return data.data
}

export async function loginUser({email, password}) {
  const response = await fetch(`${BASE_URL}/users/log-in`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({user: {email, password}}),
  })

  const data = await response.json()

  if (!response.ok) {
    throw data.errors
  }

  return data.data
}