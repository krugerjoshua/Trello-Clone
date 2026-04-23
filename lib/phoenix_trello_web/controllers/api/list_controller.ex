defmodule PhoenixTrelloWeb.Api.ListController do
  use PhoenixTrelloWeb, :controller
  alias PhoenixTrello.BoardList
  alias PhoenixTrello.Board
  alias PhoenixTrello.Accounts.Scope

  defp scope(conn), do: %Scope{user: conn.assigns.current_user}

  def index(conn, %{"board_id" => board_id}) do
    board = Board.get_boards!(scope(conn), board_id)
    lists = BoardList.list_list()
    lists = Enum.filter(lists, fn l -> l.board_id == board.id end)
    json(conn, %{data: lists})
  end

  def create(conn, %{"board_id" => board_id, "list" => list_params}) do
    board = Board.get_boards!(scope(conn), board_id)
    case BoardList.create_lists(Map.merge(list_params, %{"board_id" => board.id})) do
      {:ok, list} ->
        conn
        |> put_status(:created)
        |> json(%{data: list})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset_errors(changeset)})
    end
  end

  def show(conn, %{"id" => id}) do
    list = BoardList.get_lists!(id)
    json(conn, %{data: list})
  end

  def update(conn, %{"id" => id, "list" => list_params}) do
    list = BoardList.get_lists!(id)
    case BoardList.update_lists(list, list_params) do
      {:ok, list} ->
        json(conn, %{data: list})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset_errors(changeset)})
    end
  end

  def delete(conn, %{"id" => id}) do
    list = BoardList.get_lists!(id)
    {:ok, _} = BoardList.delete_lists(list)
    send_resp(conn, :no_content, "")
  end

  defp changeset_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end
end