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
    <div className="min-h-screen bg-blue-700 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
            />
          </div>

          {errors && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              {Object.entries(errors).map(([field, messages]) => (
                <p key={field} className="text-red-600 text-sm">{field}: {messages.join(", ")}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}