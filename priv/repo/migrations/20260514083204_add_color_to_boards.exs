defmodule PhoenixTrello.Repo.Migrations.AddColorToBoards do
  use Ecto.Migration

  def change do
    alter table(:boards) do
      add :color, :string, default: "#0079BF"
    end
  end
end