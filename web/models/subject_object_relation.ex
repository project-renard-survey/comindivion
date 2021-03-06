defmodule Comindivion.SubjectObjectRelation do
  use Comindivion.Web, :model

  # :binary_id is managed by drivers/adapters, it will be UUID for mysql, postgres
  #  but can be ObjectID if later you decide to use mongo
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @derive {Poison.Encoder, only: [:id, :subject_id, :object_id, :predicate_id]}
  schema "subject_object_relations" do
    belongs_to :subject, Comindivion.MindObject
    belongs_to :object, Comindivion.MindObject
    belongs_to :predicate, Comindivion.Predicate
    belongs_to :user, Comindivion.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:subject_id, :object_id, :predicate_id])
    |> validate_required([:subject_id, :object_id, :predicate_id, :user_id])
    |> unique_constraint(:subject_id, name: :subject_object_relation_uniqueness_index)
  end
end
