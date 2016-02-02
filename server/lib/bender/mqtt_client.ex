defmodule Bender.MqttClient do
  require Logger
  use Hulaaki.Client

  def start do
    mqtt_host = Application.get_env(:bender, Bender.Endpoint)[:mqtt][:host]

    options = [client_id: "bender-web-phoenix", host: mqtt_host, port: 1883, keep_alive: 3600]
    Bender.MqttClient.connect(Process.whereis(:mqtt), options)
    
    handle_subscribes
  end

  def handle_subscribes do
    packet_id = :random.uniform(65535)
    options = [id: packet_id, topics: ["sensors/luminosity", "sensors/temperature", "sensors/breathalyzer", "sensors/ir/receive", "sensors/socket/1"], qoses: [0, 0, 0, 0, 0]]

    Bender.MqttClient.subscribe(Process.whereis(:mqtt), options)
  end

  def publish_message(message, topic) do
    packet_id = :random.uniform(65535)
    options = [id: packet_id, topic: topic, message: message, dup: 0, qos: 0, retain: 0]

    Bender.MqttClient.publish(Process.whereis(:mqtt), options)
    Logger.info("Published message #{message} to #{topic} with packet_id #{packet_id}.")
  end

  def on_subscribed_publish(options) do
    option = List.first(options)
    value = elem(option, 1).message
    topic = elem(option, 1).topic

    case topic do
      "sensors/ir/receive" -> Bender.Endpoint.broadcast("infrared:control", "infrared:value", %{value: value, topic: topic})
      "sensors/socket/1"   -> Bender.Endpoint.broadcast("relays:control", "relays:value", %{value: value, topic: topic})
      _                    -> Bender.Endpoint.broadcast("sensors:data", "sensor:update", %{value: value, topic: topic})
    end

    Logger.info("Subscribed message #{value} from #{topic}.")
  end
end
