defmodule PhoenixTrelloWeb.Api.UserRegistrationController do
  use PhoenixTrelloWeb, :controller
  alias PhoenixTrello.Accounts

  def create(conn, %{"user" => user_params}) do
    case Accounts.register_user_with_password(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(%{data: %{id: user.id, email: user.email}})

      {:error, %Ecto.Changeset{} = changeset} ->
        errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
          Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
            opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
          end)
        end)

        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: errors})
    end
  end
end