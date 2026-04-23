defmodule PhoenixTrello.Repo do
  use Ecto.Repo,
    otp_app: :phoenix_trello,
    adapter: Ecto.Adapters.Postgres
end
