defmodule Bender.Repo.Migrations.CreateInfrared do
  use Ecto.Migration

  def change do
    create table(:infrareds) do
      add :description, :string
      add :codes, {:array, :string}

      timestamps
    end

  end
end
