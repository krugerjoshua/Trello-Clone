defmodule PhoenixTrelloWeb.UserSessionHTML do
  use PhoenixTrelloWeb, :html

  embed_templates "user_session_html/*"

  defp local_mail_adapter? do
    Application.get_env(:phoenix_trello, PhoenixTrello.Mailer)[:adapter] == Swoosh.Adapters.Local
  end
end
