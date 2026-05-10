import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../features/auth/authSlice.js"
import {getBoards, addBoard} from "../features/boards/boardsSlice"
import {Link} from "react-router-dom"

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
    <div>
      <header>
        <h1>Phoenix Trello</h1>
        <span>{email}</span>
        <button onClick={handleLogout}>Log out</button>
      </header>

      <main>
        <h2>My Boards</h2>

        <div>
          {boards.map((board) => (
            <div key={board.id}>
              <Link to={`/boards/${board.id}`}><h3>{board.title}</h3></Link>
            </div>
          ))}

          {showForm ? (
            <form onSubmit={handleCreateBoard}>
              <input
                type="text"
                placeholder="Board title"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                autoFocus
              />
              <button type="submit" disabled={loading}>Add</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          ) : (
            <button onClick={() => setShowForm(true)}>+ New Board</button>
          )}
        </div>
      </main>
    </div>
  )
}