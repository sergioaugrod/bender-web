defmodule Bender.InfraredController do
  use Bender.Web, :controller

  alias Bender.Infrared

  plug :scrub_params, "infrared" when action in [:create, :update]

  def index(conn, _params) do
    infrareds = Repo.all(Infrared)
    render(conn, "index.json", infrareds: infrareds)
  end

  def create(conn, %{"infrared" => infrared_params}) do
    changeset = Infrared.changeset(%Infrared{}, infrared_params)

    case Repo.insert(changeset) do
      {:ok, infrared} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", infrared_path(conn, :show, infrared))
        |> render("show.json", infrared: infrared)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Bender.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    infrared = Repo.get!(Infrared, id)
    render(conn, "show.json", infrared: infrared)
  end

  def update(conn, %{"id" => id, "infrared" => infrared_params}) do
    infrared = Repo.get!(Infrared, id)
    changeset = Infrared.changeset(infrared, infrared_params)

    case Repo.update(changeset) do
      {:ok, infrared} ->
        render(conn, "show.json", infrared: infrared)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Bender.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    infrared = Repo.get!(Infrared, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(infrared)

    send_resp(conn, :no_content, "")
  end
end
