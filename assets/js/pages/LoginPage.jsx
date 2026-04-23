import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, Link} from "react-router-dom"
import {login} from "../features/auth/authSlice"

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, errors} = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await dispatch(login({email, password}))
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/")
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors && (
          <div>
            {Object.entries(errors).map(([field, messages]) => (
              <p key={field}>{field}: {messages.join(", ")}</p>
            ))}
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}