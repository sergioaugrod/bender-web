defmodule Bender.RelayChannel do
  use Phoenix.Channel

  def join("relays:control", message, socket) do
    {:ok, socket}
  end

  def handle_in("relays:turn", message, socket) do
    turn = message["turn"]

    Bender.MqttClient.publish_message(turn, "relay")
    {:reply, {:ok, %{turn: message["turn"]}}, socket}
  end
end
