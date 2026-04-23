defmodule PhoenixTrelloWeb.Api.CardController do
  use PhoenixTrelloWeb, :controller
  alias PhoenixTrello.Card
  alias PhoenixTrello.BoardList

  def index(conn, %{"list_id" => list_id}) do
    list = BoardList.get_lists!(list_id)
    cards = Card.list_card()
    cards = Enum.filter(cards, fn c -> c.list_id == list.id end)
    json(conn, %{data: cards})
  end

  def create(conn, %{"list_id" => list_id, "card" => card_params}) do
    list = BoardList.get_lists!(list_id)
    case Card.create_cards(Map.merge(card_params, %{"list_id" => list.id})) do
      {:ok, card} ->
        conn
        |> put_status(:created)
        |> json(%{data: card})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset_errors(changeset)})
    end
  end

  def show(conn, %{"id" => id}) do
    card = Card.get_cards!(id)
    json(conn, %{data: card})
  end

  def update(conn, %{"id" => id, "card" => card_params}) do
    card = Card.get_cards!(id)
    case Card.update_cards(card, card_params) do
      {:ok, card} ->
        json(conn, %{data: card})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset_errors(changeset)})
    end
  end

  def delete(conn, %{"id" => id}) do
    card = Card.get_cards!(id)
    {:ok, _} = Card.delete_cards(card)
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