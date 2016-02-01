defmodule Bender do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Start the endpoint when the application starts
      supervisor(Bender.Endpoint, []),
      supervisor(Bender.MqttClient, [%{}])
      # Here you could define other workers and supervisors as children
      # worker(Bender.Worker, [arg1, arg2, arg3]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Bender.Supervisor]

    supervisor = Supervisor.start_link(children, opts)
    pid = elem(List.first(Supervisor.which_children(elem(supervisor, 1))), 1)

    Process.register(pid, :mqtt)

    Bender.MqttClient.start
    supervisor
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Bender.Endpoint.config_change(changed, removed)
    :ok
  end
end
