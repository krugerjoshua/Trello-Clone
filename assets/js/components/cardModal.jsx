import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { updateCardDescription } from "../features/cards/cardsSlice";

export default function CardModal({ card, onClose }) {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(card.description || "");
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        setSaving(true);
        await dispatch(updateCardDescription({ id: card.id, description }));
        setSaving(false);
        onClose();
    }

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) onClose();
    }

    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {card.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a description..."
                        rows={4}
                        className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 outline-none focus:border-blue-500 resize-none"
                    />
                </div>

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
