# Bender

Capture and sends sensor data by MQTT server.

## Prerequisites

You will need the following things properly installed on your computer:

* [Elixir](https://github.com/elixir-lang/elixir)
* [http-server](https://github.com/indexzero/http-server)
* [Bower](https://github.com/nodejs/node)

## Instalation

Execute the following commands to install dependencies and init project:

```console
$ cd client
$ bower install
$ http-server
```

```console
$ cd server 
$ mix deps.get
$ mix phoenix.server
```

Change MQTT host config `mqtt.host` in `server/config/config.exs`:

```elixir
  mqtt: [host: "localhost" ]
```

## Usage

Now you can visit [`localhost:8080`](http://localhost:8080) from your browser.

## Contributing

1. Clone it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
