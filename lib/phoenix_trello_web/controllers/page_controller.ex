defmodule PhoenixTrelloWeb.PageController do
  use PhoenixTrelloWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
