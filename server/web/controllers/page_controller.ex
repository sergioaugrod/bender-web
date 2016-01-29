defmodule Bender.PageController do
  use Bender.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
