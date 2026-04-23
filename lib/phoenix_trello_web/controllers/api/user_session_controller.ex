defmodule PhoenixTrelloWeb.Api.UserSessionController do
  use PhoenixTrelloWeb, :controller
  alias PhoenixTrello.Accounts

def create(conn, %{"user" => %{"email" => email, "password" => password}}) do
  case Accounts.get_user_by_email_and_password(email, password) do
    %Accounts.User{} = user ->
      token = Accounts.generate_user_session_token(user)

      conn
      |> put_status(:ok)
      |> json(%{data: %{token: Base.url_encode64(token), email: user.email, id: user.id}})

    nil ->
      conn
      |> put_status(:unauthorized)
      |> json(%{errors: %{credentials: ["invalid email or password"]}})
  end
end

  def delete(conn, _params) do
    token = get_req_header(conn, "authorization")
    |> List.first()
    |> case do
      "Bearer " <> token -> Base.url_decode64!(token)
      _ -> nil
    end

    if token, do: Accounts.delete_user_session_token(token)

    conn
    |> put_status(:ok)
    |> json(%{ok: true})
  end
end