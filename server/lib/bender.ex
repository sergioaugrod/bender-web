defmodule Bender do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      supervisor(Bender.Endpoint, []),
      supervisor(Bender.MqttClient, [%{}])
    ]

    opts = [strategy: :one_for_one, name: Bender.Supervisor]

    {:ok, supervisor_pid} = supervisor = Supervisor.start_link(children, opts)

    {_module, mqtt_pid, _, _} = Supervisor.which_children(supervisor_pid) |> List.first
    Process.register(mqtt_pid, :mqtt)

    Bender.MqttClient.start
    supervisor
  end

  def config_change(changed, _new, removed) do
    Bender.Endpoint.config_change(changed, removed)
    :ok
  end
end
