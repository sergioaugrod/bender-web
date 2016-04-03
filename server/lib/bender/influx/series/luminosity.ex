defmodule Bender.Influx.Series.Luminosity do
  use Instream.Series

  series do
    database "bender"
    measurement "luminosity"

    field :value
  end
end
