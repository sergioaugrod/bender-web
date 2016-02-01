defmodule Bender.SensorChannel do
  use Phoenix.Channel

  def join("sensors:data", message, socket) do
    {:ok, socket}
  end

  def join("sensors:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
