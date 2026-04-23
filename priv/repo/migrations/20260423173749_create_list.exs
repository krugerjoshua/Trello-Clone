defmodule PhoenixTrello.Repo.Migrations.CreateList do
  use Ecto.Migration

  def change do
    create table(:lists) do
      add :title, :string, null: false
      add :position, :integer, null: false, default: 0
      add :board_id, references(:boards, on_delete: :delete_all), null: false
      timestamps(type: :utc_datetime)
    end

    create index(:lists, [:board_id])
  end
end