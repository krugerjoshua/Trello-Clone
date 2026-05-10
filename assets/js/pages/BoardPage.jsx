import React, {useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getLists, addList} from "../features/lists/listsSlice"
import ListColumn from "../components/ListColumn"

export default function BoardPage() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {lists, loading} = useSelector((state) => state.lists)

  const [newListTitle, setNewListTitle] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(getLists(id))
  }, [dispatch, id])

  async function handleCreateList(e) {
    e.preventDefault()
    if (!newListTitle.trim()) return
    const result = await dispatch(addList({boardId: id, title: newListTitle}))
    if (result.meta.requestStatus === "fulfilled") {
      setNewListTitle("")
      setShowForm(false)
    }
  }

  return (
    <div>
      <header>
        <Link to="/">Back to boards</Link>
      </header>
      <main>
        <div>
          {lists.map((list) => (
            <div key={list.id}>
              <ListColumn key={list.id} list={list} />
            </div>
          ))}

          {showForm ? (
            <form onSubmit={handleCreateList}>
              <input
                type="text"
                placeholder="List title"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                autoFocus
              />
              <button type="submit" disabled={loading}>Add</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          ) : (
            <button onClick={() => setShowForm(true)}>+ Add List</button>
          )}
        </div>
      </main>
    </div>
  )
}