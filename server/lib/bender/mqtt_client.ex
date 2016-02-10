defmodule Bender.MqttClient do
  require Logger
  use Hulaaki.Client

  def start do
    options = [client_id: "bender-web-phoenix", host: config[:host],
      username: config[:username], password: config[:password],
      port: config[:port], keep_alive: 0]

    Bender.MqttClient.connect(Process.whereis(:mqtt), options)
    handle_subscribes
  end

  def config do
    Application.get_env(:bender, Bender.Endpoint)[:mqtt]
  end

  def queues do
    config[:queues]
  end

  def topics do
    [queues[:luminosity], queues[:temperature], queues[:infrared][:receiver], queues[:relay][:receiver]]
  end

  def handle_subscribes do
    packet_id = :random.uniform(65535)
    options = [id: packet_id, topics: topics, qoses: [0, 0, 0, 0]]

    Bender.MqttClient.subscribe(Process.whereis(:mqtt), options)
  end

  def publish_message(message, topic) do
    packet_id = :random.uniform(65535)
    options = [id: packet_id, topic: topic, message: message, dup: 0, qos: 0, retain: 0]

    Bender.MqttClient.publish(Process.whereis(:mqtt), options)
    Logger.info("Published message #{message} to #{topic} with packet_id #{packet_id}.")
  end

  def on_connect(_options) do
    Logger.info("Connected to MQTT on host #{config[:host]}")
  end

  def on_disconnect(_options) do
    Logger.info("Disconnected to MQTT on host #{config[:host]}")
  end

  def on_subscribed_publish(options) do
    option = List.first(options)
    value = elem(option, 1).message
    topic = elem(option, 1).topic

    cond do
      queues[:infrared][:receiver] == topic -> Bender.Endpoint.broadcast("infrared:control", "infrared:value", %{value: value, topic: topic})
      queues[:relay][:receiver]    == topic -> Bender.Endpoint.broadcast("relays:control", "relays:value", %{value: value, topic: topic})
      queues[:temperature]         == topic  -> Bender.Endpoint.broadcast("sensors:data", "sensor:update", %{value: value, topic: topic})
      queues[:luminosity]          == topic  -> Bender.Endpoint.broadcast("sensors:data", "sensor:update", %{value: value, topic: topic})
    end

    Logger.info("Subscribed message #{value} from #{topic}.")
  end
end
