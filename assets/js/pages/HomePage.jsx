import {Link} from "react-router-dom"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../features/auth/authSlice.js"
import {getBoards, addBoard} from "../features/boards/boardsSlice"

export default function HomePage() {
  const dispatch = useDispatch()
  const {user, token} = useSelector((state) => state.auth)
  const {boards, loading} = useSelector((state) => state.boards)

  const [newBoardTitle, setNewBoardTitle] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  function handleLogout() {
    dispatch(logout())
  }

  async function handleCreateBoard(e) {
    e.preventDefault()
    if (!newBoardTitle.trim()) return
    const result = await dispatch(addBoard(newBoardTitle))
    if (result.meta.requestStatus === "fulfilled") {
      setNewBoardTitle("")
      setShowForm(false)
    }
  }

  const email = user?.email || token ? "user" : ""

  return (
    <div className="min-h-screen bg-blue-700">
      <header className="flex items-center justify-between px-6 py-3 bg-blue-800 shadow-md">
        <h1 className="text-white text-xl font-bold">Phoenix Trello</h1>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">{email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="p-8">
        <h2 className="text-white text-lg font-semibold mb-6">My Boards</h2>

        <div className="flex flex-wrap gap-4">
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/boards/${board.id}`}
              className="w-48 h-28 bg-blue-500 hover:bg-blue-400 rounded-lg p-4 flex items-end cursor-pointer"
            >
              <h3 className="text-white font-semibold">{board.title}</h3>
            </Link>
          ))}

          {showForm ? (
            <form
              onSubmit={handleCreateBoard}
              className="w-48 h-28 bg-blue-900 rounded-lg p-3 flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="Board title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                autoFocus
                className="px-2 py-1 rounded text-sm bg-white text-gray-800 outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-3 py-1 rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-blue-300 hover:text-white text-sm px-2 py-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-48 h-28 bg-blue-600 bg-opacity-60 hover:bg-opacity-80 rounded-lg p-4 flex items-center justify-center text-white text-sm cursor-pointer"
            >
              + New Board
            </button>
          )}
        </div>
      </main>
    </div>
  )
}