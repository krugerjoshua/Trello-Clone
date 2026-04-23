defmodule PhoenixTrello.CardFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `PhoenixTrello.Card` context.
  """

  @doc """
  Generate a cards.
  """
  def cards_fixture(attrs \\ %{}) do
    {:ok, cards} =
      attrs
      |> Enum.into(%{
        cards: "some cards",
        description: "some description",
        position: 42,
        title: "some title"
      })
      |> PhoenixTrello.Card.create_cards()

    cards
  end
end
