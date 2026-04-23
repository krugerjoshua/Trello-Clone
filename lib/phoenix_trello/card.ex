defmodule PhoenixTrello.Card do
  @moduledoc """
  The Card context.
  """

  import Ecto.Query, warn: false
  alias PhoenixTrello.Repo

  alias PhoenixTrello.Card.Cards

  @doc """
  Returns the list of card.

  ## Examples

      iex> list_card()
      [%Cards{}, ...]

  """
  def list_card do
    Repo.all(Cards)
  end

  @doc """
  Gets a single cards.

  Raises `Ecto.NoResultsError` if the Cards does not exist.

  ## Examples

      iex> get_cards!(123)
      %Cards{}

      iex> get_cards!(456)
      ** (Ecto.NoResultsError)

  """
  def get_cards!(id), do: Repo.get!(Cards, id)

  @doc """
  Creates a cards.

  ## Examples

      iex> create_cards(%{field: value})
      {:ok, %Cards{}}

      iex> create_cards(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_cards(attrs) do
    %Cards{}
    |> Cards.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a cards.

  ## Examples

      iex> update_cards(cards, %{field: new_value})
      {:ok, %Cards{}}

      iex> update_cards(cards, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_cards(%Cards{} = cards, attrs) do
    cards
    |> Cards.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a cards.

  ## Examples

      iex> delete_cards(cards)
      {:ok, %Cards{}}

      iex> delete_cards(cards)
      {:error, %Ecto.Changeset{}}

  """
  def delete_cards(%Cards{} = cards) do
    Repo.delete(cards)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking cards changes.

  ## Examples

      iex> change_cards(cards)
      %Ecto.Changeset{data: %Cards{}}

  """
  def change_cards(%Cards{} = cards, attrs \\ %{}) do
    Cards.changeset(cards, attrs)
  end
end
