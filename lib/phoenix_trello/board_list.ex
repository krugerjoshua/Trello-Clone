defmodule PhoenixTrello.BoardList do
  @moduledoc """
  The BoardList context.
  """

  import Ecto.Query, warn: false
  alias PhoenixTrello.Repo

  alias PhoenixTrello.BoardList.Lists

  @doc """
  Returns the list of list.

  ## Examples

      iex> list_list()
      [%Lists{}, ...]

  """
  def list_list do
    Repo.all(Lists)
  end

  @doc """
  Gets a single lists.

  Raises `Ecto.NoResultsError` if the Lists does not exist.

  ## Examples

      iex> get_lists!(123)
      %Lists{}

      iex> get_lists!(456)
      ** (Ecto.NoResultsError)

  """
  def get_lists!(id), do: Repo.get!(Lists, id)

  @doc """
  Creates a lists.

  ## Examples

      iex> create_lists(%{field: value})
      {:ok, %Lists{}}

      iex> create_lists(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_lists(attrs) do
    %Lists{}
    |> Lists.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a lists.

  ## Examples

      iex> update_lists(lists, %{field: new_value})
      {:ok, %Lists{}}

      iex> update_lists(lists, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_lists(%Lists{} = lists, attrs) do
    lists
    |> Lists.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a lists.

  ## Examples

      iex> delete_lists(lists)
      {:ok, %Lists{}}

      iex> delete_lists(lists)
      {:error, %Ecto.Changeset{}}

  """
  def delete_lists(%Lists{} = lists) do
    Repo.delete(lists)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking lists changes.

  ## Examples

      iex> change_lists(lists)
      %Ecto.Changeset{data: %Lists{}}

  """
  def change_lists(%Lists{} = lists, attrs \\ %{}) do
    Lists.changeset(lists, attrs)
  end
end
