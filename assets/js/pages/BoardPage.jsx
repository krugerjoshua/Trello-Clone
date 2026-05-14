import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLists, addList } from "../features/lists/listsSlice";
import ListColumn from "../components/ListColumn";
import { getBoards } from "../features/boards/boardsSlice";
import { DragDropContext } from "@hello-pangea/dnd";
import { moveCard, reorderCards } from "../features/cards/cardsSlice";

export default function BoardPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { lists, loading } = useSelector((state) => state.lists);

    const [newListTitle, setNewListTitle] = useState("");
    const [showForm, setShowForm] = useState(false);

    const board = useSelector((state) =>
        state.boards.boards.find((b) => b.id === parseInt(id)),
    );

    useEffect(() => {
        dispatch(getLists(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getBoards());
    }, [dispatch]);

    async function handleCreateList(e) {
        e.preventDefault();
        if (!newListTitle.trim()) return;
        const result = await dispatch(
            addList({ boardId: id, title: newListTitle }),
        );
        if (result.meta.requestStatus === "fulfilled") {
            setNewListTitle("");
            setShowForm(false);
        }
    }

    function handleDragEnd(result) {
        const { draggableId, source, destination } = result;

        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const cardId = parseInt(draggableId);
        const sourceListId = parseInt(source.droppableId);
        const destListId = parseInt(destination.droppableId);

        dispatch(
            reorderCards({
                cardId,
                sourceListId,
                destListId,
                sourceIndex: source.index,
                destIndex: destination.index,
            }),
        );

        dispatch(
            moveCard({
                cardId,
                listId: destListId,
                position: destination.index,
            }),
        );
    }

    return (
        <div className="min-h-screen bg-blue-700">
            <header className="flex items-center justify-between px-6 py-3 bg-blue-800 shadow-md relative">
                <Link to="/" className="text-white text-sm hover:underline">
                    ← Back to boards
                </Link>
                <h1 className="text-white font-bold text-lg absolute left-1/2 -translate-x-1/2">
                    {board?.title}
                </h1>
            </header>

            <main className="p-6 overflow-x-auto">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="flex gap-4 items-start">
                        {lists.map((list) => (
                            <ListColumn key={list.id} list={list} />
                        ))}

                        {showForm ? (
                            <form
                                onSubmit={handleCreateList}
                                className="bg-blue-900 rounded-lg p-3 flex flex-col gap-2 w-64 shrink-0"
                            >
                                <input
                                    type="text"
                                    placeholder="List title"
                                    value={newListTitle}
                                    onChange={(e) =>
                                        setNewListTitle(e.target.value)
                                    }
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
                                className="bg-blue-600 bg-opacity-60 hover:bg-opacity-80 text-white text-sm px-4 py-3 rounded-lg w-64 shrink-0 text-left"
                            >
                                + Add List
                            </button>
                        )}
                    </div>
                </DragDropContext>
            </main>
        </div>
    );
}
