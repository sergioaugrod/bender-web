defmodule Bender.SensorChannel do
  use Phoenix.Channel

  def join("sensors:data", _message, socket) do
    {:ok, socket}
  end
end
