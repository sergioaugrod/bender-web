defmodule Bender.RelayChannel do
  use Phoenix.Channel

  def join("relays:control", message, socket) do
    {:ok, socket}
  end

  def join("relays:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("relays:turn", message, socket) do
    turn = message["turn"]

    Bender.MqttClient.publish_message(turn, "relay")
    {:reply, {:ok, %{turn: message["turn"]}}, socket}
  end
end
