defmodule PhoenixTrello.Repo.Migrations.CreateCard do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :title, :string, null: false
      add :description, :string
      add :position, :integer, null: false, default: 0
      add :list_id, references(:lists, on_delete: :delete_all), null: false
      timestamps(type: :utc_datetime)
    end

    create index(:cards, [:list_id])
  end
end