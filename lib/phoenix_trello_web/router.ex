defmodule PhoenixTrelloWeb.Router do
  use PhoenixTrelloWeb, :router
  import PhoenixTrelloWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {PhoenixTrelloWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_scope_for_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug :accepts, ["json"]
    plug PhoenixTrelloWeb.Api.AuthPlug
  end

  scope "/api", PhoenixTrelloWeb do
    pipe_through :api

    post "/users/register", Api.UserRegistrationController, :create
    post "/users/log-in", Api.UserSessionController, :create
    delete "/users/log-out", Api.UserSessionController, :delete
  end

  scope "/api", PhoenixTrelloWeb do
    pipe_through :api_auth

    resources "/boards", Api.BoardController, except: [:new, :edit]
    resources "/boards/:board_id/lists", Api.ListController, except: [:new, :edit]
    resources "/lists/:list_id/cards", Api.CardController, except: [:new, :edit]
    delete "/lists/:id", Api.ListController, :delete
    delete "/cards/:id", Api.CardController, :delete
  end

  if Application.compile_env(:phoenix_trello, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: PhoenixTrelloWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  scope "/", PhoenixTrelloWeb do
    pipe_through :browser
    get "/*path", PageController, :home
  end
end