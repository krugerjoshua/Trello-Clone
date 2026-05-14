defmodule PhoenixTrello.Board.Boards do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :color, :user_id, :inserted_at, :updated_at]}

schema "boards" do
  field :title, :string
  field :color, :string, default: "#0079BF"
  field :user_id, :id
  timestamps(type: :utc_datetime)
end

  @doc false
  def changeset(boards, attrs, user_scope) do
    boards
    |> cast(attrs, [:title, :color])
    |> validate_required([:title])
    |> put_change(:user_id, user_scope.user.id)
  end
end