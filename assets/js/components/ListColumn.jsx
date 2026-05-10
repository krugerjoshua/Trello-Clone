import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getCards, addCard} from "../features/cards/cardsSlice"

export default function ListColumn({list}) {
  const dispatch = useDispatch()
  const cards = useSelector((state) =>
    state.cards.cards.filter((card) => card.list_id === list.id)
  )

  const [newCardTitle, setNewCardTitle] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(getCards(list.id))
  }, [dispatch, list.id])

  async function handleCreateCard(e) {
    e.preventDefault()
    if (!newCardTitle.trim()) return
    const result = await dispatch(addCard({listId: list.id, title: newCardTitle}))
    if (result.meta.requestStatus === "fulfilled") {
      setNewCardTitle("")
      setShowForm(false)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg p-3 w-64 shrink-0 flex flex-col gap-2">
      <h3 className="font-semibold text-gray-800 px-1">{list.title}</h3>

      <div className="flex flex-col gap-2">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded shadow-sm px-3 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-50">
            <p>{card.title}</p>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleCreateCard} className="flex flex-col gap-2 mt-1">
          <input
            type="text"
            placeholder="Card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            autoFocus
            className="px-2 py-1 rounded text-sm bg-white text-gray-800 border border-gray-300 outline-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-3 py-1 rounded"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-800 text-sm px-2 py-1"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="text-gray-500 hover:text-gray-800 text-sm px-1 py-1 text-left hover:bg-gray-200 rounded"
        >
          + Add Card
        </button>
      )}
    </div>
  )
}