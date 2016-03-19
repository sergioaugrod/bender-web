# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :bender, Bender.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "DTmkVsdVV+y4/JQ3setrxoX67Fzs4ssWhUCdXwKL3uVT6c8aF+cSOEpU4pbV9aoG",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Bender.PubSub,
           adapter: Phoenix.PubSub.PG2],
   mqtt: [
     host: "localhost", username: "", password: "", port: 1883,
     queues: [
       luminosity: "receiver/luminosity",
       temperature: "receiver/temperature",
       infrared: [sender: "sender/infrared", receiver: "receiver/infrared"],
       relay: [sender: "sender/relay", receiver: "receiver/relay"]
     ]
   ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
