defmodule Bender.InfraredControllerTest do
  use Bender.ConnCase

  alias Bender.Infrared
  @valid_attrs %{codes: ["X1234"], description: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, infrared_path(conn, :index)
    assert json_response(conn, 200)["data"] == [%{"codes" => [], "description" => "some content", "id" => 1}]
  end

  test "shows chosen resource", %{conn: conn} do
    infrared = Repo.insert! %Infrared{}
    conn = get conn, infrared_path(conn, :show, infrared)
    assert json_response(conn, 200)["data"] == %{"id" => infrared.id,
      "description" => infrared.description,
      "codes" => infrared.codes}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, infrared_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, infrared_path(conn, :create), infrared: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Infrared, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, infrared_path(conn, :create), infrared: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    infrared = Repo.insert! %Infrared{}
    conn = put conn, infrared_path(conn, :update, infrared), infrared: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Infrared, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    infrared = Repo.insert! %Infrared{}
    conn = put conn, infrared_path(conn, :update, infrared), infrared: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    infrared = Repo.insert! %Infrared{}
    conn = delete conn, infrared_path(conn, :delete, infrared)
    assert response(conn, 204)
    refute Repo.get(Infrared, infrared.id)
  end
end
