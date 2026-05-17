const BASE_URL = "/api";

export async function fetchLists(token, boardId) {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw data.errors;
    }

    return data.data;
}

export async function createList(token, boardId, title) {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ list: { title, position: 0 } }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw data.errors;
    }

    return data.data;
}

export async function deleteList(token, id) {
    const response = await fetch(`${BASE_URL}/lists/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete list");
    }

    return id;
}

export async function updateList(token, id, attrs) {
    const response = await fetch(`${BASE_URL}/lists/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ list: attrs }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw data.errors;
    }

    return data.data;
}
