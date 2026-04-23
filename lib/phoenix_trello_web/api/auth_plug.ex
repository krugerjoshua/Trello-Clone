defmodule PhoenixTrelloWeb.Api.AuthPlug do
  import Plug.Conn
  alias PhoenixTrello.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, raw_token} <- Base.url_decode64(token),
         {user, _token_record} <- Accounts.get_user_by_session_token(raw_token) do
      assign(conn, :current_user, user)
    else
      _ ->
        conn
        |> put_resp_content_type("application/json")
        |> send_resp(401, ~s({"error": "unauthorized"}))
        |> halt()
    end
  end
end