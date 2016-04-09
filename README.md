# Bender

Capture and sends sensor data by MQTT server. Builded with Elixir and AngularJS.

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

Change `MQTT` config in [server/config/config.exs](https://github.com/sergioaugrod/bender-web/blob/master/server/config/config.exs):

```elixir
mqtt: [
  host: "localhost", username: "", password: "", port: 1883,
  queues: [
    luminosity: "receiver/luminosity",
    temperature: "receiver/temperature",
    humidity: "receiver/humidity",
    infrared: [sender: "sender/infrared", receiver: "receiver/infrared"],
    relay: [sender: "sender/relay", receiver: "receiver/relay"]
  ]
]
```

Change `Bender.Influx.Connection` config in [server/config/config.exs](https://github.com/sergioaugrod/bender-web/blob/master/server/config/config.exs):

```elixir
config :bender, Bender.Influx.Connection,
  hosts:     [ "192.168.99.100" ],
  http_opts: [ insecure: true ],
  pool:      [ max_overflow: 0, size: 1 ],
  port:      8086,
  scheme:    "http",
  writer:    Instream.Writer.Line
```

Change `Constants`config in [client/app/app.constants.js](https://github.com/sergioaugrod/bender-web/blob/master/client/app/app.constants.js):

```javascript
var constants = {
  api: {
    url: 'http://localhost:4000/api/',
    resources: {
      infrareds: 'infrareds/'
    }
  },
  socket: {
    host: 'localhost:4000',
    channels: {
      sensors: {
        name: 'sensors:data',
        events: {
          update: 'sensor:update'
        }
      },
      infrared: {
        name: 'infrared:control',
        events: {
          value: 'infrared:value',
          sender: 'infrared:sender'
        }
      },
      relays: {
        name: 'relays:control',
        events: {
          value: 'relays:value',
          turn: 'relays:turn'
        }
      }
    }
  }
};
```

## Usage

Now you can visit [`localhost:8080`](http://localhost:8080) from your browser.

## Contributing

1. Clone it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
