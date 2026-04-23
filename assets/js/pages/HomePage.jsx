import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../features/auth/authSlice"

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)

  const email = user?.email || "user"

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Welcome, {email}</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}