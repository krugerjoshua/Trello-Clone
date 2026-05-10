defmodule PhoenixTrello.Card.Cards do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :description, :position, :list_id, :inserted_at, :updated_at]}

  schema "cards" do
    field :title, :string
    field :description, :string
    field :position, :integer
    field :list_id, :id
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(cards, attrs) do
    cards
    |> cast(attrs, [:title, :description, :position, :list_id])
    |> validate_required([:title, :position, :list_id])
  end
end