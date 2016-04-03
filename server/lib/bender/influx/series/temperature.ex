defmodule Bender.Influx.Series.Temperature do
  use Instream.Series

  series do
    database "bender"
    measurement "temperature"

    field :value
  end
end
