defmodule Bender.InfraredChannel do
  use Phoenix.Channel

  def join("infrared:control", message, socket) do
    {:ok, socket}
  end

  def handle_in("infrared:sender", message, socket) do
    code = message["code"]

    Bender.MqttClient.publish_message(code, "infrared/sender")
    {:reply, {:ok, %{turn: message["code"]}}, socket}
  end
end
