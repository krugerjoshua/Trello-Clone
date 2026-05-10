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
    <div>
      <h3>{list.title}</h3>
      <div>
        {cards.map((card) => (
          <div key={card.id}>
            <p>{card.title}</p>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleCreateCard}>
          <input
            type="text"
            placeholder="Card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            autoFocus
          />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>+ Add Card</button>
      )}
    </div>
  )
}