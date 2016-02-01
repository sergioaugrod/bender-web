defmodule Bender.MqttClient do
  require Logger
  use Hulaaki.Client

  def start do
    options = [client_id: "bender-web-phoenix", host: "localhost", port: 1883, keep_alive: 3600]
    Bender.MqttClient.connect(Process.whereis(:mqtt), options)
    
    handle_subscribes
  end

  def handle_subscribes do
    options = [id: 100, topics: ["sensors/luminosity", "sensors/temperature", "sensors/breathalyzer", "infrared/value"], qoses: [0, 0, 0, 0]]
    Bender.MqttClient.subscribe(Process.whereis(:mqtt), options)
  end

  def publish_message(message, topic) do
    options = [id: 101, topic: topic, message: message, dup: 0, qos: 0, retain: 0]

    Bender.MqttClient.publish(Process.whereis(:mqtt), options)
    Logger.info("Published message #{message} to #{topic}")
  end

  def on_subscribed_publish(options) do
    option = List.first(options)
    value = elem(option, 1).message
    topic = elem(option, 1).topic

    case topic do
      "infrared/value" -> Bender.Endpoint.broadcast("infrared:control", "infrared:value", %{value: value, topic: topic})
      _                -> Bender.Endpoint.broadcast("sensors:data", "sensor:update", %{value: value, topic: topic})
    end

    Logger.info("Subscribed message #{value} from #{topic}")
  end
end
