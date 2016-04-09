defmodule Bender.Influx.Series.Humidity do
  use Instream.Series

  series do
    database "bender"
    measurement "humidity"

    field :value
  end
end
