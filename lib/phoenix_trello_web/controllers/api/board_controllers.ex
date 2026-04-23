defmodule PhoenixTrelloWeb.Api.BoardController do
  use PhoenixTrelloWeb, :controller
  alias PhoenixTrello.Board
  alias PhoenixTrello.Accounts.Scope

  defp scope(conn), do: %Scope{user: conn.assigns.current_user}

  def index(conn, _params) do
    boards = Board.list_board(scope(conn))
    json(conn, %{data: boards})
  end

  def create(conn, %{"board" => board_params}) do
    case Board.create_boards(scope(conn), board_params) do
      {:ok, board} ->
        conn
        |> put_status(:created)
        |> json(%{data: board})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset_errors(changeset)})
    end
  end

  def show(conn, %{"id" => id}) do
    board = Board.get_boards!(scope(conn), id)
    json(conn, %{data: board})
  end

  def update(conn, %{"id" => id, "board" => board_params}) do
    board = Board.get_boards!(scope(conn), id)
    case Board.update_boards(scope(conn), board, board_params) do
      {:ok, board} ->
        json(conn, %{data: board})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset_errors(changeset)})
    end
  end

  def delete(conn, %{"id" => id}) do
    board = Board.get_boards!(scope(conn), id)
    {:ok, _} = Board.delete_boards(scope(conn), board)
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