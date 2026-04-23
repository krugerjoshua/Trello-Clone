defmodule PhoenixTrello.BoardFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `PhoenixTrello.Board` context.
  """

  @doc """
  Generate a boards.
  """
  def boards_fixture(scope, attrs \\ %{}) do
    attrs =
      Enum.into(attrs, %{
        boards: "some boards",
        title: "some title"
      })

    {:ok, boards} = PhoenixTrello.Board.create_boards(scope, attrs)
    boards
  end
end
