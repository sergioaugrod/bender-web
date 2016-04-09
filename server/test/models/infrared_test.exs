defmodule Bender.InfraredTest do
  use Bender.ModelCase

  alias Bender.Infrared

  @valid_attrs %{codes: [], description: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Infrared.changeset(%Infrared{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Infrared.changeset(%Infrared{}, @invalid_attrs)
    refute changeset.valid?
  end
end
