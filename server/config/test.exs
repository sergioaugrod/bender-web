use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :bender, Bender.Endpoint,
  http: [port: 4001],
  server: false

# Configure your database
config :bender, Bender.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "bender",
  password: "bender",
  database: "bender_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# Print only warnings and errors during test
config :logger, level: :warn
