defmodule PhoenixTrello.BoardListFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `PhoenixTrello.BoardList` context.
  """

  @doc """
  Generate a lists.
  """
  def lists_fixture(attrs \\ %{}) do
    {:ok, lists} =
      attrs
      |> Enum.into(%{
        lists: "some lists",
        position: 42,
        title: "some title"
      })
      |> PhoenixTrello.BoardList.create_lists()

    lists
  end
end
