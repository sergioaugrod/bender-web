defmodule Bender.InfraredChannel do
  use Phoenix.Channel

  def join("infrared:control", _message, socket) do
    {:ok, socket}
  end

  def handle_in("infrared:sender", message, socket) do
    code = message["code"]
    queue = Bender.MqttClient.queues[:infrared][:sender]

    Bender.MqttClient.publish_message(code, queue)
    {:reply, {:ok, %{turn: message["code"]}}, socket}
  end
end
