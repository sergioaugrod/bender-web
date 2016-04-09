defmodule Bender.InfraredView do
  use Bender.Web, :view

  def render("index.json", %{infrareds: infrareds}) do
    %{data: render_many(infrareds, Bender.InfraredView, "infrared.json")}
  end

  def render("show.json", %{infrared: infrared}) do
    %{data: render_one(infrared, Bender.InfraredView, "infrared.json")}
  end

  def render("infrared.json", %{infrared: infrared}) do
    %{id: infrared.id,
      description: infrared.description,
      codes: infrared.codes}
  end
end
