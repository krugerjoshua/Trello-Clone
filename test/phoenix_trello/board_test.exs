defmodule PhoenixTrello.BoardTest do
  use PhoenixTrello.DataCase

  alias PhoenixTrello.Board

  describe "board" do
    alias PhoenixTrello.Board.Boards

    import PhoenixTrello.AccountsFixtures, only: [user_scope_fixture: 0]
    import PhoenixTrello.BoardFixtures

    @invalid_attrs %{title: nil, boards: nil}

    test "list_board/1 returns all scoped board" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      boards = boards_fixture(scope)
      other_boards = boards_fixture(other_scope)
      assert Board.list_board(scope) == [boards]
      assert Board.list_board(other_scope) == [other_boards]
    end

    test "get_boards!/2 returns the boards with given id" do
      scope = user_scope_fixture()
      boards = boards_fixture(scope)
      other_scope = user_scope_fixture()
      assert Board.get_boards!(scope, boards.id) == boards
      assert_raise Ecto.NoResultsError, fn -> Board.get_boards!(other_scope, boards.id) end
    end

    test "create_boards/2 with valid data creates a boards" do
      valid_attrs = %{title: "some title", boards: "some boards"}
      scope = user_scope_fixture()

      assert {:ok, %Boards{} = boards} = Board.create_boards(scope, valid_attrs)
      assert boards.title == "some title"
      assert boards.boards == "some boards"
      assert boards.user_id == scope.user.id
    end

    test "create_boards/2 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      assert {:error, %Ecto.Changeset{}} = Board.create_boards(scope, @invalid_attrs)
    end

    test "update_boards/3 with valid data updates the boards" do
      scope = user_scope_fixture()
      boards = boards_fixture(scope)
      update_attrs = %{title: "some updated title", boards: "some updated boards"}

      assert {:ok, %Boards{} = boards} = Board.update_boards(scope, boards, update_attrs)
      assert boards.title == "some updated title"
      assert boards.boards == "some updated boards"
    end

    test "update_boards/3 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      boards = boards_fixture(scope)

      assert_raise MatchError, fn ->
        Board.update_boards(other_scope, boards, %{})
      end
    end

    test "update_boards/3 with invalid data returns error changeset" do
      scope = user_scope_fixture()
      boards = boards_fixture(scope)
      assert {:error, %Ecto.Changeset{}} = Board.update_boards(scope, boards, @invalid_attrs)
      assert boards == Board.get_boards!(scope, boards.id)
    end

    test "delete_boards/2 deletes the boards" do
      scope = user_scope_fixture()
      boards = boards_fixture(scope)
      assert {:ok, %Boards{}} = Board.delete_boards(scope, boards)
      assert_raise Ecto.NoResultsError, fn -> Board.get_boards!(scope, boards.id) end
    end

    test "delete_boards/2 with invalid scope raises" do
      scope = user_scope_fixture()
      other_scope = user_scope_fixture()
      boards = boards_fixture(scope)
      assert_raise MatchError, fn -> Board.delete_boards(other_scope, boards) end
    end

    test "change_boards/2 returns a boards changeset" do
      scope = user_scope_fixture()
      boards = boards_fixture(scope)
      assert %Ecto.Changeset{} = Board.change_boards(scope, boards)
    end
  end
end
