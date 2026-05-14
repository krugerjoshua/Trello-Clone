import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCards,
    addCard,
    removeCard,
    moveCard,
    reorderCards,
    editCard,
} from "../features/cards/cardsSlice";
import { removeList } from "../features/lists/listsSlice";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function ListColumn({ list }) {
    const dispatch = useDispatch();
    const cards = useSelector((state) =>
        state.cards.cards.filter((card) => card.list_id === list.id),
    );

    const [newCardTitle, setNewCardTitle] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingCardId, setEditingCardId] = useState(null);
    const [editingCardTitle, setEditingCardTitle] = useState("");

    useEffect(() => {
        dispatch(getCards(list.id));
    }, [dispatch, list.id]);

    async function handleCreateCard(e) {
        e.preventDefault();
        if (!newCardTitle.trim()) return;
        const result = await dispatch(
            addCard({ listId: list.id, title: newCardTitle }),
        );
        if (result.meta.requestStatus === "fulfilled") {
            setNewCardTitle("");
            setShowForm(false);
        }
    }

    function handleDeleteList() {
        dispatch(removeList(list.id));
    }

    function handleDeleteCard(id) {
        dispatch(removeCard(id));
    }

    function handleEditStart(card) {
        setEditingCardId(card.id);
        setEditingCardTitle(card.title);
    }

    async function handleEditSave(card) {
        if (editingCardTitle.trim() && editingCardTitle !== card.title) {
            await dispatch(editCard({ id: card.id, title: editingCardTitle }));
        }
        setEditingCardId(null);
    }

    function handleEditKeyDown(e, card) {
        if (e.key === "Enter") handleEditSave(card);
        if (e.key === "Escape") setEditingCardId(null);
    }

    return (
        <div className="bg-gray-100 rounded-lg p-3 w-64 shrink-0 flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
                <h3 className="font-semibold text-gray-800">{list.title}</h3>
                <button
                    onClick={handleDeleteList}
                    className="text-gray-400 hover:text-red-500 text-xs px-1"
                >
                    ✕
                </button>
            </div>

            <Droppable droppableId={String(list.id)}>
                {(provided) => (
                    <div
                        className="flex flex-col gap-2"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {cards.map((card, index) => (
                            <Draggable
                                key={String(card.id)}
                                draggableId={String(card.id)}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-white rounded shadow-sm px-3 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 flex items-center justify-between group"
                                    >
                                        {editingCardId === card.id ? (
                                            <input
                                                type="text"
                                                value={editingCardTitle}
                                                onChange={(e) =>
                                                    setEditingCardTitle(
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={() =>
                                                    handleEditSave(card)
                                                }
                                                onKeyDown={(e) =>
                                                    handleEditKeyDown(e, card)
                                                }
                                                autoFocus
                                                className="w-full text-sm text-gray-800 outline-none border border-blue-400 rounded px-1"
                                            />
                                        ) : (
                                            <>
                                                <p
                                                    onClick={() =>
                                                        handleEditStart(card)
                                                    }
                                                    className="flex-1 cursor-text"
                                                >
                                                    {card.title}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCard(
                                                            card.id,
                                                        )
                                                    }
                                                    className="text-gray-300 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100"
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {showForm ? (
                <form
                    onSubmit={handleCreateCard}
                    className="flex flex-col gap-2 mt-1"
                >
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
    );
}
