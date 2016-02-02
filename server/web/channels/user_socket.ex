defmodule Bender.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "sensors:*", Bender.SensorChannel
  channel "relays:*", Bender.RelayChannel
  channel "infrared:*", Bender.InfraredChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  transport :longpoll, Phoenix.Transports.LongPoll

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
