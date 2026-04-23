defmodule PhoenixTrello.BoardListTest do
  use PhoenixTrello.DataCase

  alias PhoenixTrello.BoardList

  describe "list" do
    alias PhoenixTrello.BoardList.Lists

    import PhoenixTrello.BoardListFixtures

    @invalid_attrs %{position: nil, lists: nil, title: nil}

    test "list_list/0 returns all list" do
      lists = lists_fixture()
      assert BoardList.list_list() == [lists]
    end

    test "get_lists!/1 returns the lists with given id" do
      lists = lists_fixture()
      assert BoardList.get_lists!(lists.id) == lists
    end

    test "create_lists/1 with valid data creates a lists" do
      valid_attrs = %{position: 42, lists: "some lists", title: "some title"}

      assert {:ok, %Lists{} = lists} = BoardList.create_lists(valid_attrs)
      assert lists.position == 42
      assert lists.lists == "some lists"
      assert lists.title == "some title"
    end

    test "create_lists/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BoardList.create_lists(@invalid_attrs)
    end

    test "update_lists/2 with valid data updates the lists" do
      lists = lists_fixture()
      update_attrs = %{position: 43, lists: "some updated lists", title: "some updated title"}

      assert {:ok, %Lists{} = lists} = BoardList.update_lists(lists, update_attrs)
      assert lists.position == 43
      assert lists.lists == "some updated lists"
      assert lists.title == "some updated title"
    end

    test "update_lists/2 with invalid data returns error changeset" do
      lists = lists_fixture()
      assert {:error, %Ecto.Changeset{}} = BoardList.update_lists(lists, @invalid_attrs)
      assert lists == BoardList.get_lists!(lists.id)
    end

    test "delete_lists/1 deletes the lists" do
      lists = lists_fixture()
      assert {:ok, %Lists{}} = BoardList.delete_lists(lists)
      assert_raise Ecto.NoResultsError, fn -> BoardList.get_lists!(lists.id) end
    end

    test "change_lists/1 returns a lists changeset" do
      lists = lists_fixture()
      assert %Ecto.Changeset{} = BoardList.change_lists(lists)
    end
  end
end
