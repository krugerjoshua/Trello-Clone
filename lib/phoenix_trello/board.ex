defmodule PhoenixTrello.Board do
  @moduledoc """
  The Board context.
  """

  import Ecto.Query, warn: false
  alias PhoenixTrello.Repo

  alias PhoenixTrello.Board.Boards
  alias PhoenixTrello.Accounts.Scope

  @doc """
  Subscribes to scoped notifications about any boards changes.

  The broadcasted messages match the pattern:

    * {:created, %Boards{}}
    * {:updated, %Boards{}}
    * {:deleted, %Boards{}}

  """
  def subscribe_board(%Scope{} = scope) do
    key = scope.user.id

    Phoenix.PubSub.subscribe(PhoenixTrello.PubSub, "user:#{key}:board")
  end

  defp broadcast_boards(%Scope{} = scope, message) do
    key = scope.user.id

    Phoenix.PubSub.broadcast(PhoenixTrello.PubSub, "user:#{key}:board", message)
  end

  @doc """
  Returns the list of board.

  ## Examples

      iex> list_board(scope)
      [%Boards{}, ...]

  """
  def list_board(%Scope{} = scope) do
    Repo.all_by(Boards, user_id: scope.user.id)
  end

  @doc """
  Gets a single boards.

  Raises `Ecto.NoResultsError` if the Boards does not exist.

  ## Examples

      iex> get_boards!(scope, 123)
      %Boards{}

      iex> get_boards!(scope, 456)
      ** (Ecto.NoResultsError)

  """
  def get_boards!(%Scope{} = scope, id) do
    Repo.get_by!(Boards, id: id, user_id: scope.user.id)
  end

  @doc """
  Creates a boards.

  ## Examples

      iex> create_boards(scope, %{field: value})
      {:ok, %Boards{}}

      iex> create_boards(scope, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_boards(%Scope{} = scope, attrs) do
    with {:ok, boards = %Boards{}} <-
           %Boards{}
           |> Boards.changeset(attrs, scope)
           |> Repo.insert() do
      broadcast_boards(scope, {:created, boards})
      {:ok, boards}
    end
  end

  @doc """
  Updates a boards.

  ## Examples

      iex> update_boards(scope, boards, %{field: new_value})
      {:ok, %Boards{}}

      iex> update_boards(scope, boards, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_boards(%Scope{} = scope, %Boards{} = boards, attrs) do
    true = boards.user_id == scope.user.id

    with {:ok, boards = %Boards{}} <-
           boards
           |> Boards.changeset(attrs, scope)
           |> Repo.update() do
      broadcast_boards(scope, {:updated, boards})
      {:ok, boards}
    end
  end

  @doc """
  Deletes a boards.

  ## Examples

      iex> delete_boards(scope, boards)
      {:ok, %Boards{}}

      iex> delete_boards(scope, boards)
      {:error, %Ecto.Changeset{}}

  """
  def delete_boards(%Scope{} = scope, %Boards{} = boards) do
    true = boards.user_id == scope.user.id

    with {:ok, boards = %Boards{}} <-
           Repo.delete(boards) do
      broadcast_boards(scope, {:deleted, boards})
      {:ok, boards}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking boards changes.

  ## Examples

      iex> change_boards(scope, boards)
      %Ecto.Changeset{data: %Boards{}}

  """
  def change_boards(%Scope{} = scope, %Boards{} = boards, attrs \\ %{}) do
    true = boards.user_id == scope.user.id

    Boards.changeset(boards, attrs, scope)
  end
end
