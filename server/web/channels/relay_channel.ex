defmodule Bender.RelayChannel do
  use Phoenix.Channel

  def join("relays:control", _message, socket) do
    {:ok, socket}
  end

  def handle_in("relays:turn", message, socket) do
    turn = message["turn"]

    Bender.MqttClient.publish_message(turn, "bender/socket/1")
    {:reply, {:ok, %{turn: message["turn"]}}, socket}
  end
end
