defmodule PhoenixTrello.BoardList.Lists do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :position, :board_id, :inserted_at, :updated_at]}

  schema "lists" do
    field :title, :string
    field :position, :integer
    field :board_id, :id
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(lists, attrs) do
    lists
    |> cast(attrs, [:title, :position, :board_id])
    |> validate_required([:title, :position, :board_id])
  end
end