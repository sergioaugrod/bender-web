defmodule Bender.RelayChannel do
  use Phoenix.Channel

  def join("relays:control", _message, socket) do
    {:ok, socket}
  end

  def handle_in("relays:turn", message, socket) do
    turn = message["turn"]
    queue = Bender.MqttClient.queues[:relay][:sender]

    Bender.MqttClient.publish_message(turn, queue)
    {:reply, {:ok, %{turn: message["turn"]}}, socket}
  end
end
