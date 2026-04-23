defmodule PhoenixTrello.CardTest do
  use PhoenixTrello.DataCase

  alias PhoenixTrello.Card

  describe "card" do
    alias PhoenixTrello.Card.Cards

    import PhoenixTrello.CardFixtures

    @invalid_attrs %{position: nil, description: nil, title: nil, cards: nil}

    test "list_card/0 returns all card" do
      cards = cards_fixture()
      assert Card.list_card() == [cards]
    end

    test "get_cards!/1 returns the cards with given id" do
      cards = cards_fixture()
      assert Card.get_cards!(cards.id) == cards
    end

    test "create_cards/1 with valid data creates a cards" do
      valid_attrs = %{position: 42, description: "some description", title: "some title", cards: "some cards"}

      assert {:ok, %Cards{} = cards} = Card.create_cards(valid_attrs)
      assert cards.position == 42
      assert cards.description == "some description"
      assert cards.title == "some title"
      assert cards.cards == "some cards"
    end

    test "create_cards/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Card.create_cards(@invalid_attrs)
    end

    test "update_cards/2 with valid data updates the cards" do
      cards = cards_fixture()
      update_attrs = %{position: 43, description: "some updated description", title: "some updated title", cards: "some updated cards"}

      assert {:ok, %Cards{} = cards} = Card.update_cards(cards, update_attrs)
      assert cards.position == 43
      assert cards.description == "some updated description"
      assert cards.title == "some updated title"
      assert cards.cards == "some updated cards"
    end

    test "update_cards/2 with invalid data returns error changeset" do
      cards = cards_fixture()
      assert {:error, %Ecto.Changeset{}} = Card.update_cards(cards, @invalid_attrs)
      assert cards == Card.get_cards!(cards.id)
    end

    test "delete_cards/1 deletes the cards" do
      cards = cards_fixture()
      assert {:ok, %Cards{}} = Card.delete_cards(cards)
      assert_raise Ecto.NoResultsError, fn -> Card.get_cards!(cards.id) end
    end

    test "change_cards/1 returns a cards changeset" do
      cards = cards_fixture()
      assert %Ecto.Changeset{} = Card.change_cards(cards)
    end
  end
end
