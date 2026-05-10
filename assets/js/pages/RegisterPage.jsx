import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, Link} from "react-router-dom"
import {register} from "../features/auth/authSlice.js"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, errors} = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await dispatch(register({email, password}))
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login")
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  )
}